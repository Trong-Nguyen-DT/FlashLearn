package com.dt.flashlearn.service.impl;

import java.security.SecureRandom;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Locale;

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
        mailService.sendEmail(input.getEmail(), input.getIsSignUp() ? createMessageSignUp(otp, input.getEmail())
                : createMessageForgotPassword(otp, input.getEmail()));
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

    private String createMessageSignUp(String otp, String email) {
        return getMessageSendEmail(true, otp, WEBSITE_NAME, email);
    }

    private String createMessageForgotPassword(String otp, String email) {
        return getMessageSendEmail(false, otp, WEBSITE_NAME, email);
    }

    private String getMessageSendEmail(boolean isSignUp, String otp, String websiteName, String email) {
        LocalDateTime dateNow = LocalDateTime.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd 'tháng' MM 'năm' yyyy", new Locale("vi", "VN"));
        String formattedDate = dateNow.format(formatter);
        if (isSignUp) {
            return "<!DOCTYPE html>" +
            "<html lang=\"en\">" +
            "<head>" +
            "    <meta charset=\"UTF-8\" />" +
            "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />" +
            "    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\" />" +
            "    <title>Static Template</title>" +
            "    <link href=\"https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap\" rel=\"stylesheet\" />" +
            "</head>" +
            "<body style=\"" +
            "      margin: 0;" +
            "      font-family: 'Poppins', sans-serif;" +
            "      background: #ffffff;" +
            "      font-size: 14px;" +
            "    \">" +
            "    <div style=\"" +
            "        max-width: 680px;" +
            "        margin: 0 auto;" +
            "        padding: 45px 30px 60px;" +
            "        background: #f4f7ff;" +
            "        background-image: url(https://img.freepik.com/free-vector/gradient-smooth-background_23-2148974923.jpg);" +
            "        background-repeat: no-repeat;" +
            "        background-size: 800px 452px;" +
            "        background-position: top center;" +
            "        font-size: 14px;" +
            "        color: #434343;" +
            "      \">" +
            "        <header>" +
            "            <table style=\"width: 100%;\">" +
            "                <tbody>" +
            "                    <tr style=\"height: 0;\">" +
            "                        <td>" +
            "                            <img style=\"border-radius: 20px;\" alt=\"\" src=\"https://flashlearnimage.s3.ap-southeast-1.amazonaws.com/Logo/avatar.png\" height=\"20%\" />" +
            "                        </td>" +
            "                        <td style=\"text-align: right;\">" +
            "                            <span style=\"font-size: 16px; line-height: 30px; color: #ffffff; font-weight: 600;\">" + formattedDate + "</span>" +
            "                        </td>" +
            "                    </tr>" +
            "                </tbody>" +
            "            </table>" +
            "        </header>" +
            "        <main>" +
            "            <div style=\"" +
            "            margin: 0;" +
            "            margin-top: 70px;" +
            "            padding: 92px 30px 115px;" +
            "            background: #ffffff;" +
            "            border-radius: 30px;" +
            "            text-align: center;" +
            "          \">" +
            "                <div style=\"width: 100%; max-width: 489px; margin: 0 auto;\">" +
            "                    <h1 style=\"" +
            "                margin: 0;" +
            "                font-size: 24px;" +
            "                font-weight: 500;" +
            "                color: #1f1f1f;" +
            "              \">" +
            "                        Mã OTP (One-Time Password)" +
            "                    </h1>" +
            "                    <p style=\"" +
            "                margin: 0;" +
            "                margin-top: 17px;" +
            "                font-size: 16px;" +
            "                font-weight: 500;" +
            "              \">" +
            "                        Xin chào " + email + "," +
            "                    </p>" +
            "                    <p style=\"" +
            "                margin: 0;" +
            "                margin-top: 17px;" +
            "                font-weight: 500;" +
            "                letter-spacing: 0.56px;" +
            "              \">" +
            "                        Chào mừng bạn đến với <span style=\"font-weight: 600; color: #1f1f1f;\">" + websiteName + "!</span>" +
            "                        Sử dụng OTP sau để hoàn tất quá trình đăng ký tài khoản của bạn." +
            "                        <br>" +
            "                        Lưu ý rằng mã OTP này chỉ có hiệu lực trong vòng <span style=\"font-weight: 600; color: #1f1f1f;\">5 phút</span>." +
            "                        <br>" +
            "                        Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này." +
            "                    </p>" +
            "                    <p style=\"" +
            "                margin: 0;" +
            "                margin-top: 60px;" +
            "                font-size: 40px;" +
            "                font-weight: 600;" +
            "                letter-spacing: 25px;" +
            "                color: #ba3d4f;" +
            "              \">" +
            "                        " + otp + "" +
            "                    </p>" +
            "                </div>" +
            "            </div>" +
            "            <p style=\"" +
            "            max-width: 400px;" +
            "            margin: 0 auto;" +
            "            margin-top: 90px;" +
            "            text-align: center;" +
            "            font-weight: 500;" +
            "            color: #8c8c8c;" +
            "          \">" +
            "                Cảm ơn bạn đã chọn <span style=\"font-weight: 600; color: #1f1f1f;\">" + websiteName + "</span>." +
            "                <br>" +
            "                Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ" +
            "                <a href=\"mailto:flashlearn02@gmail.com\" style=\"color: #499fb6; text-decoration: none;\">flashlearn02@gmail.com</a>" +
            "                hoặc đội ngũ hỗ trợ của chúng tôi tại" +
            "                <a href=\"\" target=\"_blank\" style=\"color: #499fb6; text-decoration: none;\">Trung tâm hỗ trợ FlashLearn</a>" +
            "            </p>" +
            "        </main>" +
            "        <footer style=\"" +
            "          width: 100%;" +
            "          max-width: 490px;" +
            "          margin: 20px auto 0;" +
            "          text-align: center;" +
            "          border-top: 1px solid #e6ebf1;" +
            "        \">" +
            "            <p style=\"" +
            "            margin: 0;" +
            "            margin-top: 40px;" +
            "            font-size: 16px;" +
            "            font-weight: 600;" +
            "            color: #434343;" +
            "          \">" +
            "                " + websiteName +
            "            </p>" +
            "            <p style=\"margin: 0; margin-top: 8px; color: #434343;\">" +
            "                21 Nguyễn Tuân, Sơn Trà, Đà Nẵng." +
            "            </p>" +
            "            <div style=\"margin: 0; margin-top: 16px;\">" +
            "                <a href=\"\" target=\"_blank\" style=\"display: inline-block;\">" +
            "                    <img width=\"36px\" alt=\"Facebook\" src=\"https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook\" />" +
            "                </a>" +
            "                <a href=\"\" target=\"_blank\" style=\"display: inline-block; margin-left: 8px;\">" +
            "                    <img width=\"36px\" alt=\"Instagram\" src=\"https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram\" /></a>" +
            "                <a href=\"\" target=\"_blank\" style=\"display: inline-block; margin-left: 8px;\">" +
            "                    <img width=\"36px\" alt=\"Twitter\" src=\"https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter\" />" +
            "                </a>" +
            "                <a href=\"\" target=\"_blank\" style=\"display: inline-block; margin-left: 8px;\">" +
            "                    <img width=\"36px\" alt=\"Youtube\" src=\"https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube\" /></a>" +
            "            </div>" +
            "            <p style=\"margin: 0; margin-top: 16px; color: #434343;\">" +
            "                Copyright © 2024 Company. All rights reserved." +
            "            </p>" +
            "        </footer>" +
            "    </div>" +
            "</body>" +
            "</html>";
        } else {
            return "<!DOCTYPE html>" +
            "<html lang=\"en\">" +
            "<head>" +
            "    <meta charset=\"UTF-8\" />" +
            "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />" +
            "    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\" />" +
            "    <title>Static Template</title>" +
            "    <link href=\"https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap\" rel=\"stylesheet\" />" +
            "</head>" +
            "<body style=\"" +
            "      margin: 0;" +
            "      font-family: 'Poppins', sans-serif;" +
            "      background: #ffffff;" +
            "      font-size: 14px;" +
            "    \">" +
            "    <div style=\"" +
            "        max-width: 680px;" +
            "        margin: 0 auto;" +
            "        padding: 45px 30px 60px;" +
            "        background: #f4f7ff;" +
            "        background-image: url(https://img.freepik.com/free-vector/gradient-smooth-background_23-2148974923.jpg);" +
            "        background-repeat: no-repeat;" +
            "        background-size: 800px 452px;" +
            "        background-position: top center;" +
            "        font-size: 14px;" +
            "        color: #434343;" +
            "      \">" +
            "        <header>" +
            "            <table style=\"width: 100%;\">" +
            "                <tbody>" +
            "                    <tr style=\"height: 0;\">" +
            "                        <td>" +
            "                            <img style=\"border-radius: 20px;\" alt=\"\" src=\"https://flashlearnimage.s3.ap-southeast-1.amazonaws.com/Logo/avatar.png\" height=\"20%\" />" +
            "                        </td>" +
            "                        <td style=\"text-align: right;\">" +
            "                            <span style=\"font-size: 16px; line-height: 30px; color: #ffffff; font-weight: 600;\">" + formattedDate + "</span>" +
            "                        </td>" +
            "                    </tr>" +
            "                </tbody>" +
            "            </table>" +
            "        </header>" +
            "        <main>" +
            "            <div style=\"" +
            "            margin: 0;" +
            "            margin-top: 70px;" +
            "            padding: 92px 30px 115px;" +
            "            background: #ffffff;" +
            "            border-radius: 30px;" +
            "            text-align: center;" +
            "          \">" +
            "                <div style=\"width: 100%; max-width: 489px; margin: 0 auto;\">" +
            "                    <h1 style=\"" +
            "                margin: 0;" +
            "                font-size: 24px;" +
            "                font-weight: 500;" +
            "                color: #1f1f1f;" +
            "              \">" +
            "                        Mã OTP (One-Time Password)" +
            "                    </h1>" +
            "                    <p style=\"" +
            "                margin: 0;" +
            "                margin-top: 17px;" +
            "                font-size: 16px;" +
            "                font-weight: 500;" +
            "              \">" +
            "                        Xin chào " + email + "," +
            "                    </p>" +
            "                    <p style=\"" +
            "                margin: 0;" +
            "                margin-top: 17px;" +
            "                font-weight: 500;" +
            "                letter-spacing: 0.56px;" +
            "              \">" +
            "                        Chúng tôi nhận được yêu cầu đặt lại mật khẩu cho tài khoản của bạn tại <span style=\"font-weight: 600; color: #1f1f1f;\">" + websiteName + "!</span>" +
            "                        <br>" +
            "                        Để tiếp tục, vui lòng sử dụng Mã OTP (One-Time Password) sau" +
            "                        <br>" +
            "                        Lưu ý rằng mã OTP này chỉ có hiệu lực trong vòng <span style=\"font-weight: 600; color: #1f1f1f;\">5 phút</span>." +
            "                        <br>" +
            "                        Nếu bạn không yêu cầu mã này, vui lòng bỏ qua email này." +
            "                    </p>" +
            "                    <p style=\"" +
            "                margin: 0;" +
            "                margin-top: 60px;" +
            "                font-size: 40px;" +
            "                font-weight: 600;" +
            "                letter-spacing: 25px;" +
            "                color: #ba3d4f;" +
            "              \">" +
            "                        " + otp + "" +
            "                    </p>" +
            "                </div>" +
            "            </div>" +
            "            <p style=\"" +
            "            max-width: 400px;" +
            "            margin: 0 auto;" +
            "            margin-top: 90px;" +
            "            text-align: center;" +
            "            font-weight: 500;" +
            "            color: #8c8c8c;" +
            "          \">" +
            "                Cảm ơn bạn đã chọn <span style=\"font-weight: 600; color: #1f1f1f;\">" + websiteName + "</span>." +
            "                <br>" +
            "                Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ" +
            "                <a href=\"mailto:flashlearn02@gmail.com\" style=\"color: #499fb6; text-decoration: none;\">flashlearn02@gmail.com</a>" +
            "                hoặc đội ngũ hỗ trợ của chúng tôi tại" +
            "                <a href=\"\" target=\"_blank\" style=\"color: #499fb6; text-decoration: none;\">Trung tâm hỗ trợ FlashLearn</a>" +
            "            </p>" +
            "        </main>" +
            "        <footer style=\"" +
            "          width: 100%;" +
            "          max-width: 490px;" +
            "          margin: 20px auto 0;" +
            "          text-align: center;" +
            "          border-top: 1px solid #e6ebf1;" +
            "        \">" +
            "            <p style=\"" +
            "            margin: 0;" +
            "            margin-top: 40px;" +
            "            font-size: 16px;" +
            "            font-weight: 600;" +
            "            color: #434343;" +
            "          \">" +
            "                " + websiteName +
            "            </p>" +
            "            <p style=\"margin: 0; margin-top: 8px; color: #434343;\">" +
            "                21 Nguyễn Tuân, Sơn Trà, Đà Nẵng." +
            "            </p>" +
            "            <div style=\"margin: 0; margin-top: 16px;\">" +
            "                <a href=\"\" target=\"_blank\" style=\"display: inline-block;\">" +
            "                    <img width=\"36px\" alt=\"Facebook\" src=\"https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook\" />" +
            "                </a>" +
            "                <a href=\"\" target=\"_blank\" style=\"display: inline-block; margin-left: 8px;\">" +
            "                    <img width=\"36px\" alt=\"Instagram\" src=\"https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram\" /></a>" +
            "                <a href=\"\" target=\"_blank\" style=\"display: inline-block; margin-left: 8px;\">" +
            "                    <img width=\"36px\" alt=\"Twitter\" src=\"https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter\" />" +
            "                </a>" +
            "                <a href=\"\" target=\"_blank\" style=\"display: inline-block; margin-left: 8px;\">" +
            "                    <img width=\"36px\" alt=\"Youtube\" src=\"https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube\" /></a>" +
            "            </div>" +
            "            <p style=\"margin: 0; margin-top: 16px; color: #434343;\">" +
            "                Copyright © 2024 Company. All rights reserved." +
            "            </p>" +
            "        </footer>" +
            "    </div>" +
            "</body>" +
            "</html>";
        }
    }

}
