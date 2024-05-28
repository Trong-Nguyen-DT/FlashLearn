package com.dt.flashlearn.model.response;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AIResponse {
    private boolean status;
    private String error;
    private Word originalWord;
    private List<Word> similarWord;
    private List<Sentence> sentences;
}
