package com.dt.flashlearn.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dt.flashlearn.entity.Vocabulary.PartOfSpeech;
import com.dt.flashlearn.entity.Vocabulary.VocabularyEntity;

@Repository
public interface VocabularyRepository extends JpaRepository<VocabularyEntity, Long> {

    List<VocabularyEntity> findByDeletedFalseOrderByWordAsc();

    Optional<VocabularyEntity> findVocabularyByIdAndDeletedFalse(Long id);

    VocabularyEntity findByWordAndPartOfSpeech(String word, PartOfSpeech partOfSpeech);
    
}
