package com.dt.flashlearn.service.impl;

import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.dt.flashlearn.constant.ErrorConstants;
import com.dt.flashlearn.constant.TypeImageConstants;
import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.service.AmazonS3Service;
import com.dt.flashlearn.service.ImageService;

@Service
public class ImageServiceImpl implements ImageService {
    @Autowired
    private AmazonS3Service amazonS3Service;

    @Value("${aws.s3.bucket.name}")
    private String bucketName;

    @Value("${endpoint.url}")
    private String endPoint;

    @Override
    public String upload(MultipartFile file, String type) {
        String imageFor = "";
        String url = endPoint;
         try {
            if (file.isEmpty()) {
                throw new IOException("Cannot upload empty file");
            }
            switch (type) {
                case TypeImageConstants.AVATAR:
                    imageFor = TypeImageConstants.AVATAR;
                    break;
                case TypeImageConstants.COURSE_IMAGE:
                    imageFor = TypeImageConstants.COURSE_IMAGE;
                    break;
                case TypeImageConstants.LESSON_IMAGE:
                    imageFor = TypeImageConstants.LESSON_IMAGE;
                    break;
                case TypeImageConstants.VOCABULARY_IMAGE:
                    imageFor = TypeImageConstants.VOCABULARY_IMAGE;
                    break;
                default:
                    throw new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE);
            }

            Map<String, String> metadata = new HashMap<>();
            metadata.put("Content-Type", file.getContentType());
            metadata.put("Content-Length", String.valueOf(file.getSize()));
            String path = String.format("%s/%s", bucketName, imageFor);
            String fileName = generateFileName(file);
            amazonS3Service.upload(path, fileName, Optional.of(metadata), file.getInputStream());
            return url + imageFor + "/" + fileName;
         } catch (Exception e) {
            throw new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE);
         }
    }

    private String generateFileName(MultipartFile multiPart) {
        return new Date().getTime() + "-" + multiPart.getOriginalFilename().replace(" ", "_");
    } 
}
