package com.dt.flashlearn.service.impl;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dt.flashlearn.constant.ErrorConstants;
import com.dt.flashlearn.converter.UserConverter;
import com.dt.flashlearn.entity.User.UserEntity;
import com.dt.flashlearn.entity.User.UserRole;
import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.User;
import com.dt.flashlearn.repository.UserRepository;
import com.dt.flashlearn.service.UserService;

@Service
public class UserServiceImpl implements UserService{

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

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

    private boolean checkEmail(String email) {
        return userRepository.existsByEmail(email);
    }
    
}
