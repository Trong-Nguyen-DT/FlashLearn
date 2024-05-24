package com.dt.flashlearn.repository;

import java.util.List;

import org.springframework.data.jdbc.repository.query.Query;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dt.flashlearn.entity.Vocabulary.SimilarWordEntity;

@Repository
public interface SimilarWordRepository extends JpaRepository<SimilarWordEntity, Long> {
    @Query(value = "SELECT s FROM SimilarWordEntity s " +
    "WHERE s.vocabulary.id = :vocabularyId AND s.deleted = false ORDER BY RAND() LIMIT 3")
    List<SimilarWordEntity> findRandomSimilarWordsByVocabularyId(@Param("vocabularyId") Long vocabularyId);
}
