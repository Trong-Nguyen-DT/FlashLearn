package com.dt.flashlearn.model;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LearningHistory {
    private Long id;
    private LocalDateTime learnAt;
    private Integer experience;
    private boolean correct;
    private Student student;
    private VocabularyOfLesson vocabularyOfLesson;
}
