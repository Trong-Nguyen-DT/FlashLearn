package com.dt.flashlearn.model;

import java.time.LocalDate;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LearningHistory {
    private Long id;
    private LocalDate learnAt;
    private Long experience;
    private String learnType;
}
