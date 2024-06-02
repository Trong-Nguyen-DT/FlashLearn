package com.dt.flashlearn.entity;

import java.time.LocalDate;

import com.dt.flashlearn.entity.Vocabulary.TypeLearn;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
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
    
    @Enumerated(EnumType.STRING)
    private TypeLearn learnType;
    private Long experience;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "studentId")
    private StudentEntity student;

}
