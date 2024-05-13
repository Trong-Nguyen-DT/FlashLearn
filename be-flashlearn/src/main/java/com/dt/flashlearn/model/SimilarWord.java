package com.dt.flashlearn.model;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SimilarWord {
    private Long id;
    private String word;
    private String meaning;
    private String audio;
    private Vocabulary vocabulary;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
}
