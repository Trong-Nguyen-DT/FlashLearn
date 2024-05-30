package com.dt.flashlearn.model.response.learn;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LearnResponse {
    private List<VocabularyReponse> vocabularyNew;
    private List<VocabularyReponse> vocabularyOld;
    private List<QuestionLearn> questions;
}
