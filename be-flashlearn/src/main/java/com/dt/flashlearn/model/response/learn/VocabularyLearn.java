package com.dt.flashlearn.model.response.learn;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VocabularyLearn {
    private String title;
    private boolean isCorrect;

    public VocabularyLearn(String title, boolean isCorrect) {
        this.title = title;
        this.isCorrect = isCorrect;
    }
}
