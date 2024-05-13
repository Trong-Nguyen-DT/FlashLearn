package com.dt.flashlearn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dt.flashlearn.entity.VocabularyOfLessonEntity;

@Repository
public interface VocabularyOfLessonRepository extends JpaRepository<VocabularyOfLessonEntity, Long>{
    
}
