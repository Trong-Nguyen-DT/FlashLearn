package com.dt.flashlearn.entity.Vocabulary;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "sentences")
public class SentenceEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String sentence;
    @NotBlank
    private String meaning;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "vocabularyId")
    private VocabularyEntity vocabulary;

    private LocalDateTime createAt;
    private LocalDateTime updateAt;

    private boolean deleted;
}
