package com.dt.flashlearn.entity.Vocabulary;

import java.time.LocalDateTime;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "vocabularies")
public class VocabularyEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String word;
    @NotBlank
    private String meaning;

    @NotBlank
    private String partOfSpeech;

    private LocalDateTime createAt;
    private LocalDateTime updateAt;

    @OneToMany(mappedBy = "vocabulary", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SimilarWordEntity> similarWords;

    @OneToMany(mappedBy = "vocabulary", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<SentenceEntity> sentences;
    

    @NotNull
    private boolean deleted;
}
