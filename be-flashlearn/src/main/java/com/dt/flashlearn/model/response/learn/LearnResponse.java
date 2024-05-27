package com.dt.flashlearn.model.response.learn;

import java.util.List;

import com.dt.flashlearn.model.Vocabulary;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LearnResponse {
    private List<Vocabulary> vocabularyNew;
    private List<QuestionLearn> questions;
}
