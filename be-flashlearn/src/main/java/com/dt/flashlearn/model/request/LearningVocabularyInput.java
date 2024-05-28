package com.dt.flashlearn.model.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LearningVocabularyInput {
    private Long id;
    private String typeLearn;
    private double quality;
}
