package com.dt.flashlearn.service.component;

import org.springframework.web.multipart.MultipartFile;

public interface ImageService {
    public String upload(MultipartFile file, String type);
}
