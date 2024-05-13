package com.dt.flashlearn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dt.flashlearn.entity.LearningHistoryEntity;

@Repository
public interface LearningHistoryRepository extends JpaRepository<LearningHistoryEntity, Long>{
    
}
