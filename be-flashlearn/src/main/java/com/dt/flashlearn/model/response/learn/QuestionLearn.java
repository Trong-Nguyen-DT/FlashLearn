package com.dt.flashlearn.model.response.learn;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class QuestionLearn {
    private Long id;
    private String typeQuestion;
    private String typeLearn;
    private String question;
    private List<VocabularyLearn> answers;
}
