package com.dt.flashlearn.service;

public interface MailService {
    void sendEmail(String to, String subject, String message);
}
