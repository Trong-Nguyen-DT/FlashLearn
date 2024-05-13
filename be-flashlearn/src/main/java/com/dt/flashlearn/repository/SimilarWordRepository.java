package com.dt.flashlearn.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dt.flashlearn.entity.Vocabulary.SimilarWordEntity;

@Repository
public interface SimilarWordRepository extends JpaRepository<SimilarWordEntity, Long>{
    
}
