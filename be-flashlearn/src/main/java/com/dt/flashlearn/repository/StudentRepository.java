package com.dt.flashlearn.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dt.flashlearn.entity.StudentEntity;
import com.dt.flashlearn.entity.Course.CourseEntity;
import com.dt.flashlearn.entity.User.UserEntity;

@Repository
public interface StudentRepository extends JpaRepository<StudentEntity, Long>{

    List<StudentEntity> findByCourseAndDeletedFalse(CourseEntity courseEntity);

    Optional<StudentEntity> findByUserAndCourseAndDeletedFalse(UserEntity userEntity, CourseEntity courseEntity);
    
}
