package com.dt.flashlearn.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VocabularyInput {
    @NotBlank
    private String word;
    @NotBlank
    private String partOfSpeech;
}
