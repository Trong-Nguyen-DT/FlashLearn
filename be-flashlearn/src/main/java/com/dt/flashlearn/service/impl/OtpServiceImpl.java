package com.dt.flashlearn.service.impl;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dt.flashlearn.entity.OtpEntity;
import com.dt.flashlearn.model.Otp;
import com.dt.flashlearn.model.request.EmailInput;
import com.dt.flashlearn.model.response.ResponseData;
import com.dt.flashlearn.repository.OtpRepository;
import com.dt.flashlearn.service.OtpService;
import com.dt.flashlearn.service.component.MailServiceImpl;

@Service
public class OtpServiceImpl implements OtpService {
    
    @Autowired
    private MailServiceImpl mailService;

    @Autowired
    private OtpRepository otpRepository;

    @Override
    public ResponseData generateOtp(EmailInput input) {
        String otp = randomOTP();
        mailService.sendEmail(input.getEmail(), "Mã OTP xác nhận Email", otp);
        OtpEntity otpEntity = new OtpEntity();
        otpEntity.setOtp(otp);
        otpEntity.setOtpExpiration(LocalDateTime.now().plusMinutes(5));
        otpEntity = otpRepository.save(otpEntity);
        Otp responseOtp = new Otp();
        responseOtp.setEmail(input.getEmail());
        responseOtp.setEncodeOTP(otpEntity.getId());
        responseOtp.setOtpExpiration(otpEntity.getOtpExpiration());
        return new ResponseData(responseOtp);
    }

    @Override
    public boolean validateOtp(String email, Long otp) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'validateOtp'");
    }

    private String randomOTP() {
        Random random = new Random();
        int otpLength = 6;
        StringBuilder otp = new StringBuilder();

        for (int i = 0; i < otpLength; i++) {
            otp.append(random.nextInt(10));
        }
        return otp.toString();
    }

    
    
}
