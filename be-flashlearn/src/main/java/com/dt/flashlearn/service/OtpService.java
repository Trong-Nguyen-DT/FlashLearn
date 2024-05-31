package com.dt.flashlearn.service;

import com.dt.flashlearn.model.request.OtpInput;
import com.dt.flashlearn.model.response.ResponseData;

public interface OtpService {
    ResponseData generateOtp(OtpInput input);
}
