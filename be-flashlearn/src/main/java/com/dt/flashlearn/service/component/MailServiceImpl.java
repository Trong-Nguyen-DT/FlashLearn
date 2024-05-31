package com.dt.flashlearn.service.component;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.dt.flashlearn.constant.ErrorConstants;
import com.dt.flashlearn.exception.MessageException;

import jakarta.mail.internet.MimeMessage;

@Service
public class MailServiceImpl implements MailService{

    @Autowired
    private JavaMailSender sender;

    @Value("${spring.mail.username}")
    private String fromMail;

    @Override
    public void sendEmail(String email, String message) {
        try {
            MimeMessage mimeMessage = sender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");
            helper.setFrom(fromMail);
            helper.setTo(email);
            helper.setSubject("Mã OTP của bạn từ FlashLearn");
            helper.setText(message, true);
            sender.send(mimeMessage);
        } catch (Exception e) {
            throw new MessageException(ErrorConstants.SERVER_ERROR_MESSAGE, ErrorConstants.SERVER_ERROR_CODE);
        }
    }
}
