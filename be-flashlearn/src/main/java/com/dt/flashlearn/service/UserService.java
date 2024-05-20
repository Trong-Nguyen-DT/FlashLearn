package com.dt.flashlearn.service;

import org.springframework.web.multipart.MultipartFile;

import com.dt.flashlearn.model.User;
import com.dt.flashlearn.model.request.ChangPasswordInput;
import com.dt.flashlearn.model.request.UserInput;
import com.dt.flashlearn.model.response.ResponseData;

public interface UserService {

    ResponseData createUser(User input);

    ResponseData getProfile();

    ResponseData updateAvatar(MultipartFile uploadFile);

    ResponseData updateProfile(UserInput input);

    ResponseData changePassword(ChangPasswordInput input);
    
}
