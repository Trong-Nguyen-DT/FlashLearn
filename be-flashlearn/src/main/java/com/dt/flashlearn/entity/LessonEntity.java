package com.dt.flashlearn.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.dt.flashlearn.entity.Course.CourseEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "lessons")
public class LessonEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @Size(max = 1024, message = "Mô tả không quá 1024 kí tự")
    private String description;

    private Long totalVocabOfLesson;

    private String image;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "courseId")
    private CourseEntity course;

    private LocalDateTime createAt;
    private LocalDateTime updateAt;

    @OneToMany(mappedBy = "lesson", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<VocabularyOfLessonEntity> vocabularies;    
    
    @NotNull
    private boolean deleted;

}
