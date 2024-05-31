package com.dt.flashlearn.service;

import org.springframework.web.multipart.MultipartFile;

import com.dt.flashlearn.model.request.ChangPasswordInput;
import com.dt.flashlearn.model.request.ForgotInput;
import com.dt.flashlearn.model.request.SignupInput;
import com.dt.flashlearn.model.request.UserInput;
import com.dt.flashlearn.model.response.ResponseData;

public interface UserService {

    ResponseData createUser(SignupInput input);

    ResponseData getProfile();

    ResponseData updateAvatar(MultipartFile uploadFile);

    ResponseData updateProfile(UserInput input);

    ResponseData changePassword(ChangPasswordInput input);

    ResponseData forgotPassword(ForgotInput input);
    
}
