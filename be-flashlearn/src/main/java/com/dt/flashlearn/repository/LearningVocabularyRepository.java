package com.dt.flashlearn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dt.flashlearn.entity.LearningVocabularyEntity;

@Repository
public interface LearningVocabularyRepository extends JpaRepository<LearningVocabularyEntity, Long>{
    
}
