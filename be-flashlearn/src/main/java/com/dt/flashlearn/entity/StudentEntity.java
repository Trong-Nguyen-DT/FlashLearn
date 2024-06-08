package com.dt.flashlearn.entity;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.dt.flashlearn.entity.Course.CourseEntity;
import com.dt.flashlearn.entity.User.UserEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "students")
public class StudentEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "userId")
    private UserEntity user;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "courseId")
    private CourseEntity course;

    private int rating;

    private LocalDateTime createAt;
    private LocalDateTime updateAt;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LearningHistoryEntity> learningHistories;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LearningVocabularyEntity> learningVocabularies;

    @NotNull
    private boolean deleted;

    public long calculateTotalVocabLearned() {
        return this.learningVocabularies.stream()
                .filter(vocabulary -> !vocabulary.getVocabularyOfLesson().isDeleted()
                                    && !vocabulary.getVocabularyOfLesson().getLesson().isDeleted())
                .count();
    }

    public long calculateTotalExperience() {
        return this.learningHistories.stream().mapToLong(history -> history.getExperience()).sum();
    }

    public long calculateExperienceByTime(LocalDate time) {
        return this.learningHistories.stream()
                .filter(history -> history.getLearnAt().isAfter(time))
                .mapToLong(history -> history.getExperience()).sum();
    }
}
