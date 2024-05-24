package com.dt.flashlearn.entity;

import java.time.LocalDateTime;
import java.util.List;

import com.dt.flashlearn.entity.Vocabulary.VocabularyEntity;

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
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "vocabulary_of_lesson")
public class VocabularyOfLessonEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "lessonId")
    private LessonEntity lesson;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "vocabularyId")
    private VocabularyEntity vocabulary;

    private String image;

    @NotBlank
    private String meaning;

    private LocalDateTime createAt;
    private LocalDateTime updateAt;

    @OneToMany(mappedBy = "vocabularyOfLesson", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LearningVocabularyEntity> learningVocabularies;

    @NotNull
    private boolean deleted;
}
