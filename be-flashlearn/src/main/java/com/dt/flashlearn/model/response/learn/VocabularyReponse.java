package com.dt.flashlearn.model.response.learn;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VocabularyReponse {
    private Long id;
    private String word;
    private String meaning;
    private String image;
    private String partOfSpeech;
}
