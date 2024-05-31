package com.dt.flashlearn.model;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Otp {
    private String email;
    private String encodeOTP;
    private LocalDateTime otpExpiration;
}
