package com.dt.flashlearn.service;

import com.dt.flashlearn.model.request.EmailInput;
import com.dt.flashlearn.model.response.ResponseData;

public interface OtpService {
    ResponseData generateOtp(EmailInput input);

    boolean validateOtp(String email, Long otp);
}
