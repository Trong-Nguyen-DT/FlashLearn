package com.dt.flashlearn.model.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VocabularyResponseError {
    private String word;
    private String message;

    public VocabularyResponseError(String word, String message) {
        this.word = word;
        this.message = message;
    }
}
