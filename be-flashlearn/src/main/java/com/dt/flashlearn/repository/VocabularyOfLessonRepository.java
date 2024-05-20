package com.dt.flashlearn.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dt.flashlearn.entity.VocabularyOfLessonEntity;

@Repository
public interface VocabularyOfLessonRepository extends JpaRepository<VocabularyOfLessonEntity, Long>{
    Optional<VocabularyOfLessonEntity> findByIdAndDeletedFalse(Long id);
    
}
