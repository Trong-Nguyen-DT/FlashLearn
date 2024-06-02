package com.dt.flashlearn.entity.Course;

import java.time.LocalDateTime;
import java.util.List;

import com.dt.flashlearn.entity.LessonEntity;
import com.dt.flashlearn.entity.StudentEntity;
import com.dt.flashlearn.entity.User.UserEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "courses", uniqueConstraints = {
    @UniqueConstraint(columnNames = {
            "code"
    })
})
public class CourseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String code;

    @NotBlank
    private String name;

    @Size(max = 1024, message = "Mô tả không quá 1024 kí tự")
    private String description;

    private String image;

    @NotNull
    @Enumerated(EnumType.STRING)
    private CourseStatus status;

    private double avgRating = 0.0;

    private Long totalVocal = 0L;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "ownerId")
    private UserEntity owner;

    private LocalDateTime createAt;
    private LocalDateTime updateAt;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentEntity> students;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LessonEntity> lessons;

    @NotNull
    private boolean deleted;

    public double calculateAverageRating() {
        if (this.students == null || this.students.isEmpty()) {
            return 0.0; 
        }
        double avgRating = this.students.stream()
                                .filter(student -> student.getRating() > 0)
                                .mapToDouble(StudentEntity::getRating)
                                .average()
                                .orElse(0.0);


        return avgRating;
    }

    public long calculateTotalVocab() {
        if (this.lessons == null || this.lessons.isEmpty()) {
            return 0L; 
        }
        long totalVocab = this.lessons.stream()
                                .filter(lesson -> !lesson.isDeleted() && lesson.getVocabularies() != null)
                                .flatMap(lesson -> lesson.getVocabularies().stream())
                                .filter(vocabulary -> !vocabulary.isDeleted())
                                .count();

        return totalVocab;
    }

    public long calculateTotalStudent() {
        if (this.students == null || this.students.isEmpty()) {
            return 0L;
        }
        long totalStudent = this.students.stream()
                                .filter(student -> !student.isDeleted())
                                .count();
        return totalStudent;
    }

    public long calculateTotalVocabLearned(StudentEntity studentEntity) {
        if (studentEntity == null) {
            return 0L;
        }
        long totalVocabLearned = this.lessons.stream()
                                .filter(lesson -> !lesson.isDeleted() && lesson.getVocabularies() != null)
                                .flatMap(lesson -> lesson.getVocabularies().stream())
                                .filter(vocabulary -> !vocabulary.isDeleted())
                                .filter(vocabulary -> studentEntity.getLearningVocabularies().stream()
                                                        .anyMatch(learningVocabulary -> learningVocabulary.getVocabularyOfLesson().getId().equals(vocabulary.getId())))
                                .count();
        return totalVocabLearned;
    }
}
