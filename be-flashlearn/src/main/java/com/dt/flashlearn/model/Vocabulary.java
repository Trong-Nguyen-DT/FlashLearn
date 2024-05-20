package com.dt.flashlearn.model;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Vocabulary {
    private Long id;
    private String word;
    private String meaning;
    private String audio;
    private String partOfSpeech;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
}
