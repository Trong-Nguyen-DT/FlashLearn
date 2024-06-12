package com.dt.flashlearn.config;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import com.dt.flashlearn.entity.User.UserEntity;
import com.dt.flashlearn.entity.User.UserRole;
import com.dt.flashlearn.repository.UserRepository;

@Component
public class DataLoader implements CommandLineRunner{

    private final String EMAIL_USER_1 = "trongnguyen.2002.nguyenvan@gmail.com";
    private final String PASSWORD_USER_1 = "@Trong123";
    private final String NAME_USER_1 = "Nguyễn Văn Trọng Nguyên";

    private final String EMAIL_USER_2 = "ngoclinh.ngvu@gmail.com";
    private final String PASSWORD_USER_2 = "Abcd@1234";
    private final String NAME_USER_2 = "Nguyễn Vũ Ngọc Linh";

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) throws Exception {
        LocalDateTime now = LocalDateTime.now();
        if (!(userRepository.count() == 0)) {
            return;
        }
        UserEntity user1 = new UserEntity();
        user1.setEmail(EMAIL_USER_1);
        user1.setPassword(passwordEncoder.encode(PASSWORD_USER_1));
        user1.setName(NAME_USER_1);
        user1.setRole(UserRole.ROLE_USER);
        user1.setCreateAt(now);
        user1.setUpdateAt(now);
        user1.setDeleted(false);
        userRepository.save(user1);

        UserEntity user2 = new UserEntity();
        user2.setEmail(EMAIL_USER_2);
        user2.setPassword(passwordEncoder.encode(PASSWORD_USER_2));
        user2.setName(NAME_USER_2);
        user2.setRole(UserRole.ROLE_USER);
        user2.setCreateAt(now);
        user2.setUpdateAt(now);
        user2.setDeleted(false);
        userRepository.save(user2);
    }
    
}
