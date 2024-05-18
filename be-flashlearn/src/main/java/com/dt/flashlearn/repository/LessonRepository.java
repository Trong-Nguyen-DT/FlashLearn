package com.dt.flashlearn.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dt.flashlearn.entity.LessonEntity;

@Repository
public interface LessonRepository extends JpaRepository<LessonEntity, Long>{

    Optional<LessonEntity> findByIdAndDeletedIsFalse(Long id);
    
}
