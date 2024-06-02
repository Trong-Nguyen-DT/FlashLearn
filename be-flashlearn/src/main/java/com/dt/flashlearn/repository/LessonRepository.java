package com.dt.flashlearn.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dt.flashlearn.entity.LessonEntity;
import com.dt.flashlearn.entity.Course.CourseEntity;

@Repository
public interface LessonRepository extends JpaRepository<LessonEntity, Long>{

    Optional<LessonEntity> findByIdAndDeletedFalse(Long id);

    List<LessonEntity> findByCourseAndDeletedFalse(CourseEntity courseEntity);
    
}
