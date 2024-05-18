package com.dt.flashlearn.model;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VocabularyOfLesson {
    private Long id;
    private Lesson lesson;
    private Vocabulary vocabulary;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
}
