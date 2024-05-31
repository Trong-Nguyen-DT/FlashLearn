package com.dt.flashlearn.service.impl;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dt.flashlearn.constant.ErrorConstants;
import com.dt.flashlearn.constant.TypeImageConstants;
import com.dt.flashlearn.converter.UserConverter;
import com.dt.flashlearn.entity.User.UserEntity;
import com.dt.flashlearn.entity.User.UserRole;
import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.request.ChangPasswordInput;
import com.dt.flashlearn.model.request.ForgotInput;
import com.dt.flashlearn.model.request.SignupInput;
import com.dt.flashlearn.model.request.UserInput;
import com.dt.flashlearn.model.response.ResponseData;
import com.dt.flashlearn.repository.UserRepository;
import com.dt.flashlearn.service.UserService;
import com.dt.flashlearn.service.component.ImageService;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ImageService imageService;

    @Autowired
    private QueryService queryService;

    @Override
    public ResponseData createUser(SignupInput input) {
        queryService.validateOtp(input.getEmail(), input.getOtp(), input.getEncodeOTP());
        LocalDateTime now = LocalDateTime.now();
        if (queryService.checkEmail(input.getEmail())) {
            throw new MessageException(ErrorConstants.EMAIL_ALREADY_EXISTS_MESSAGE,
                    ErrorConstants.EMAIL_ALREADY_EXISTS_CODE);
        }
        UserEntity entity = new UserEntity();
        entity.setEmail(input.getEmail());
        entity.setPassword(passwordEncoder.encode(input.getPassword()));
        entity.setName(input.getName());
        entity.setRole(UserRole.ROLE_USER.name());
        entity.setPhone(input.getPhone() == null ? null : input.getPhone());
        entity.setCreateAt(now);
        entity.setUpdateAt(now);
        entity.setDeleted(false);
        return new ResponseData(UserConverter.toModel(userRepository.save(entity)));
    }

    @Override
    public ResponseData forgotPassword(ForgotInput input) {
        queryService.validateOtp(input.getEmail(), input.getOtp(), input.getEncodeOTP());
        UserEntity entity = userRepository.findUserByDeletedFalseAndEmail(input.getEmail())
                .orElseThrow(() -> new MessageException(ErrorConstants.EMAIL_ALREADY_EXISTS_MESSAGE,
                        ErrorConstants.EMAIL_ALREADY_EXISTS_CODE));
        entity.setPassword(passwordEncoder.encode(input.getPassword()));
        return new ResponseData(UserConverter.toModel(userRepository.save(entity)));
    }

    @Override
    public ResponseData getProfile() {
        UserEntity entity = queryService.getUserEntity();
        return new ResponseData(UserConverter.toModel(entity));
    }

    @Override
    public ResponseData updateProfile(UserInput input) {
        UserEntity entity = queryService.getUserEntity();
        if (queryService.checkEmail(input.getEmail())) {
            throw new MessageException(ErrorConstants.EMAIL_ALREADY_EXISTS_MESSAGE,
                    ErrorConstants.EMAIL_ALREADY_EXISTS_CODE);
        }
        entity.setEmail(input.getEmail());
        entity.setName(input.getName());
        entity.setPhone(input.getPhone() == null ? null : input.getPhone());
        entity.setUpdateAt(LocalDateTime.now());
        return new ResponseData(UserConverter.toModel(userRepository.save(entity)));
    }

    @Override
    public ResponseData updateAvatar(MultipartFile uploadFile) {
        UserEntity entity = queryService.getUserEntity();
        entity.setAvatar(imageService.upload(uploadFile, TypeImageConstants.AVATAR));
        entity.setUpdateAt(LocalDateTime.now());
        return new ResponseData(UserConverter.toModel(userRepository.save(entity)));
    }

    @Override
    public ResponseData changePassword(ChangPasswordInput input) {
        UserEntity entity = queryService.getUserEntity();
        if (!passwordEncoder.matches(input.getOldPassword(), entity.getPassword())) {
            throw new MessageException(ErrorConstants.OLD_PASSWORD_INCORRECT_MESSAGE,
                    ErrorConstants.OLD_PASSWORD_INCORRECT_CODE);
        }
        entity.setPassword(passwordEncoder.encode(input.getNewPassword()));
        entity.setUpdateAt(LocalDateTime.now());
        return new ResponseData(UserConverter.toModel(userRepository.save(entity)));
    }

}
