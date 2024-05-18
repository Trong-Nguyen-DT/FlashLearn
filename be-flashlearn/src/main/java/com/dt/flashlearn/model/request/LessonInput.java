package com.dt.flashlearn.model.request;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LessonInput {
    private Long id;
    @NotBlank
    private String name;
    @NotBlank
    private String description;
    
    private MultipartFile image;
    private Long courseId;
}
