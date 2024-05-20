package com.dt.flashlearn.model.request;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VocabularyOfLessonInput {

    private Long id;
    @NotNull
    private Long vocabularyId;
    @NotBlank
    private String meaning;
    private MultipartFile image;
    
}
