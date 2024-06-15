package com.dt.flashlearn.model.request;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VocabularyOfLessonInput {

    private Long id;
    @NotNull(message = "Id của từ vựng không được để trống")
    private Long vocabularyId;
    private String meaning;
    private MultipartFile image;
    private boolean delete;
    
}
