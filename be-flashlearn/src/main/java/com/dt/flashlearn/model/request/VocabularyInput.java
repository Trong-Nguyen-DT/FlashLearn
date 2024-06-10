package com.dt.flashlearn.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VocabularyInput {
    @NotBlank(message = "Từ không được để trống")
    private String word;
    @NotBlank(message = "Từ loại của từ không được để trống")
    private String partOfSpeech;
}
