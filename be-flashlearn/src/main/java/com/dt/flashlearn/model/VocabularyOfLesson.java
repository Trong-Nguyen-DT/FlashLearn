package com.dt.flashlearn.model;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VocabularyOfLesson {
    private Long id;
    private Vocabulary vocabulary;
    private String image;
    private String meaning;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
}
