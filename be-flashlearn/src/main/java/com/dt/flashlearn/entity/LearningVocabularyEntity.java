package com.dt.flashlearn.entity;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Entity
@Table(name = "leaning_vocabulary")
public class LearningVocabularyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate lastReview;
    private LocalDate nextReview;
    private int reviewInterval;
    private double easiness;
    private int repetition;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "studentId")
    private StudentEntity student;
    
    @NotNull
    @ManyToOne
    @JoinColumn(name = "vocabularyOfLessonId")
    private VocabularyOfLessonEntity vocabularyOfLesson;
}
