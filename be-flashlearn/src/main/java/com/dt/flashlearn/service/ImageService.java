package com.dt.flashlearn.service;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    public String upload(MultipartFile file, String type);
}
