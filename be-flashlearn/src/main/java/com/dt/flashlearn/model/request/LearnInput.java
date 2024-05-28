package com.dt.flashlearn.model.request;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LearnInput {
    private List<LearningVocabularyInput> learningVocabularies;
}
