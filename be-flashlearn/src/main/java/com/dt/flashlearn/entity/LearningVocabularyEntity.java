package com.dt.flashlearn.entity;

import java.time.LocalDate;

import jakarta.persistence.Column;
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
@Table(name = "learning_vocabulary")
public class LearningVocabularyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    private LocalDate lastReview;

    @NotNull
    private LocalDate nextReview;

    @Column(name = "reviewInterval", nullable = false)
    private int reviewInterval = 1;

    @Column(name = "easiness", nullable = false)
    private double easiness = 2.5;

    @Column(name = "repetitions", nullable = false)
    private int repetitions = 0;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "studentId", nullable = false)
    private StudentEntity student;
    
    @NotNull
    @ManyToOne
    @JoinColumn(name = "vocabularyOfLessonId", nullable = false)
    private VocabularyOfLessonEntity vocabularyOfLesson;
}
