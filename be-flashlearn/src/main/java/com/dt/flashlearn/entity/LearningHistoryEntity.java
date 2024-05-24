package com.dt.flashlearn.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;

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

@Entity
@Getter
@Setter
@Table(name = "learning_history")
public class LearningHistoryEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private LocalDate learnAt;
    private String learnType;
    private Long experience;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "studentId")
    private StudentEntity student;
    
    @NotNull
    @ManyToOne
    @JoinColumn(name = "vocabularyOfLessonId")
    private VocabularyOfLessonEntity vocabularyOfLesson;

}
