package com.dt.flashlearn.service.impl;

import java.security.SecureRandom;
import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dt.flashlearn.constant.ErrorConstants;
import com.dt.flashlearn.entity.OtpEntity;
import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.Otp;
import com.dt.flashlearn.model.request.OtpInput;
import com.dt.flashlearn.model.response.ResponseData;
import com.dt.flashlearn.repository.OtpRepository;
import com.dt.flashlearn.service.OtpService;
import com.dt.flashlearn.service.component.MailServiceImpl;

@Service
public class OtpServiceImpl implements OtpService {

    private static final int OTP_MAX_LENGTH = 6;
    private static final String WEBSITE_NAME = "FlashLearn";

    @Autowired
    private MailServiceImpl mailService;

    @Autowired
    private QueryService queryService;

    @Autowired
    private OtpRepository otpRepository;

    @Override
    public ResponseData generateOtp(OtpInput input) {
        if (!input.getIsSignUp() && !queryService.checkEmail(input.getEmail())) {
            throw new MessageException(ErrorConstants.USER_NOT_FOUND_MESSAGE, ErrorConstants.USER_NOT_FOUND_CODE);
        }
        
        String otp = randomOTP();
        mailService.sendEmail(input.getEmail(), input.getIsSignUp() ? createMessageSignUp(otp, WEBSITE_NAME)
                : createMessageForgotPassword(otp, WEBSITE_NAME));
        OtpEntity otpEntity = new OtpEntity();
        otpEntity.setOtp(otp);
        otpEntity.setEmail(input.getEmail());
        otpEntity.setOtpExpiration(LocalDateTime.now().plusMinutes(5));
        otpEntity = otpRepository.save(otpEntity);
        Otp responseOtp = new Otp();
        responseOtp.setEmail(input.getEmail());
        responseOtp.setEncodeOTP(queryService.encodeOtp(otpEntity.getOtp()));
        responseOtp.setOtpExpiration(otpEntity.getOtpExpiration());
        return new ResponseData(responseOtp);
    }

    private String randomOTP() {
        StringBuilder otp = new StringBuilder();
        SecureRandom secureRandom = new SecureRandom();

        try {
            secureRandom = SecureRandom.getInstance(secureRandom.getAlgorithm());
            for (int i = 0; i < OTP_MAX_LENGTH; i++) {
                otp.append(secureRandom.nextInt(9));
            }
        } catch (Exception e) {
            throw new MessageException(ErrorConstants.SERVER_ERROR_MESSAGE, ErrorConstants.SERVER_ERROR_CODE);
        }
        return otp.toString();
    }

    private String createMessageSignUp(String otp, String websiteName) {
        String message = String.format(
                "<html>" +
                        "<body>" +
                        "Kính gửi Quý Khách,<br><br>" +
                        "Chào mừng bạn đến với <strong>%s</strong>! Để hoàn tất đăng ký của bạn, vui lòng sử dụng Mã OTP (One-Time Password) sau:<br><br>"
                        +
                        "<h2>%s</h2><br>" +
                        "Lưu ý rằng mã OTP này chỉ có hiệu lực trong vòng 5 phút. Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này.<br><br>"
                        +
                        "Cảm ơn bạn đã chọn <strong>%s</strong>. Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với đội ngũ hỗ trợ của chúng tôi.<br><br>"
                        +
                        "Trân trọng,<br>" +
                        "Đội ngũ <strong>%s</strong>" +
                        "</body>" +
                        "</html>",
                websiteName, otp, websiteName, websiteName);
        return message;
    }

    private String createMessageForgotPassword(String otp, String websiteName) {
        String message = String.format(
                "<html>" +
                        "<body>" +
                        "Kính gửi Quý Khách,<br><br>" +
                        "Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn tại <strong>%s</strong>. Để tiếp tục, vui lòng sử dụng Mã OTP (One-Time Password) sau:<br><br>"
                        +
                        "<h2>%s</h2><br>" +
                        "Lưu ý rằng mã OTP này chỉ có hiệu lực trong vòng 5 phút. Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này hoặc liên hệ với chúng tôi để được hỗ trợ.<br><br>"
                        +
                        "Cảm ơn bạn đã sử dụng <strong>%s</strong>. Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ với đội ngũ hỗ trợ của chúng tôi.<br><br>"
                        +
                        "Trân trọng,<br>" +
                        "Đội ngũ <strong>%s</strong>" +
                        "</body>" +
                        "</html>",
                websiteName, otp, websiteName, websiteName);
        return message;
    }

}
