package com.dt.flashlearn.service.impl;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dt.flashlearn.constant.ErrorConstants;
import com.dt.flashlearn.constant.TypeImageConstants;
import com.dt.flashlearn.converter.UserConverter;
import com.dt.flashlearn.entity.User.UserEntity;
import com.dt.flashlearn.entity.User.UserRole;
import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.User;
import com.dt.flashlearn.model.request.ChangPasswordInput;
import com.dt.flashlearn.model.request.UserInput;
import com.dt.flashlearn.model.response.ResponseData;
import com.dt.flashlearn.repository.UserRepository;
import com.dt.flashlearn.service.ImageService;
import com.dt.flashlearn.service.UserService;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private ImageService imageService;

    @Override
    public User createUser(User input) {
        LocalDateTime now = LocalDateTime.now();
        if (checkEmail(input.getEmail())) {
            throw new MessageException(ErrorConstants.EMAIL_ALREADY_EXISTS_MESSAGE, ErrorConstants.EMAIL_ALREADY_EXISTS_CODE);
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
        return UserConverter.toModel(userRepository.save(entity));
    }

    @Override
    public ResponseData getProfile() {
        UserEntity entity = getUserEntity();
        return new ResponseData(UserConverter.toModel(entity));
    }

    @Override
    public ResponseData updateProfile(UserInput input) {
        UserEntity entity = getUserEntity();
        if (input.getEmail() != null && !input.getEmail().equals(entity.getEmail()) && checkEmail(input.getEmail())){
            throw new MessageException(ErrorConstants.EMAIL_ALREADY_EXISTS_MESSAGE, ErrorConstants.EMAIL_ALREADY_EXISTS_CODE);
        }
        entity.setEmail(input.getEmail());
        entity.setName(input.getName());
        if (input.getPhone() != null){
            entity.setPhone(input.getPhone());
        }
        entity.setUpdateAt(LocalDateTime.now());
        return new ResponseData(UserConverter.toModel(userRepository.save(entity)));
    }

    @Override
    public ResponseData updateAvatar(MultipartFile uploadFile) {
        UserEntity entity = getUserEntity();
        String url = imageService.upload(uploadFile, TypeImageConstants.AVATAR);
        entity.setAvatar(url);
        entity.setUpdateAt(LocalDateTime.now());
        return new ResponseData(UserConverter.toModel(userRepository.save(entity)));
    }

    @Override
    public ResponseData changePassword(ChangPasswordInput input) {
        UserEntity entity = getUserEntity();
        if (!passwordEncoder.matches(input.getOldPassword(), entity.getPassword())){
            throw new MessageException(ErrorConstants.OLD_PASSWORD_INCORRECT_MESSAGE, ErrorConstants.OLD_PASSWORD_INCORRECT_CODE);
        }
        entity.setPassword(passwordEncoder.encode(input.getNewPassword()));
        entity.setUpdateAt(LocalDateTime.now());
        return new ResponseData(UserConverter.toModel(userRepository.save(entity)));
    }

    private boolean checkEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    private UserEntity getUserEntity() {
        return userRepository.findUserByDeletedFalseAndEmail(getAuthentication().getName()).orElseThrow(() -> new MessageException(ErrorConstants.USER_NOT_FOUND_MESSAGE, ErrorConstants.USER_NOT_FOUND_CODE));
    }

    private Authentication getAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName().equals("anonymousUser")) {
            throwUnauthorizedException();
        }
        return authentication;
    }

    private void throwUnauthorizedException() {
        throw new MessageException(ErrorConstants.UNAUTHORIZED_MESSAGE, ErrorConstants.UNAUTHORIZED_CODE);
    }

}
