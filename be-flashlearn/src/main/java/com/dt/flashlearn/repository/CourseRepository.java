package com.dt.flashlearn.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dt.flashlearn.entity.Course.CourseEntity;
import com.dt.flashlearn.entity.Course.CourseStatus;
import com.dt.flashlearn.entity.User.UserEntity;

@Repository
public interface CourseRepository extends JpaRepository<CourseEntity, Long> {

        @Query("SELECT c FROM CourseEntity c " +
                        "JOIN c.owner o " +
                        "WHERE ((:userEntity IS NULL) OR (c.owner = :userEntity)) " +
                        "AND (c.deleted = false) " +
                        "AND (:searchText IS NULL OR " +
                        "c.name LIKE %:searchText% OR " +
                        "c.description LIKE %:searchText% OR " +
                        "o.name LIKE %:searchText%) " +
                        "AND (c.avgRating >= :rating) " +
                        "AND (c.totalVocal BETWEEN :startCount AND :endCount) " +
                        "AND (:status IS NULL OR c.status = :status) " +
                        "ORDER BY " +
                        "CASE " +
                        "    WHEN :orderBy = 'createAt' THEN c.createAt " +
                        "    WHEN :orderBy = 'rating' THEN c.avgRating " +
                        "    WHEN :orderBy = 'wordCount' THEN c.totalVocal " +
                        "    WHEN :orderBy = 'name' THEN c.name " +
                        "END DESC")
        Page<CourseEntity> findAllCourseDesc(@Param("searchText") String searchText,
                        @Param("rating") int rating,
                        @Param("startCount") int startCount,
                        @Param("endCount") int endCount,
                        @Param("userEntity") UserEntity userEntity,
                        @Param("status") CourseStatus status,
                        @Param("orderBy") String orderBy,
                        Pageable pageable);

        @Query("SELECT c FROM CourseEntity c " +
                        "JOIN c.owner o " +
                        "WHERE ((:userEntity IS NULL) OR (c.owner = :userEntity)) " +
                        "AND (c.deleted = false) " +
                        "AND (:searchText IS NULL OR " +
                        "c.name LIKE %:searchText% OR " +
                        "c.description LIKE %:searchText% OR " +
                        "o.name LIKE %:searchText%) " +
                        "AND (c.avgRating >= :rating) " +
                        "AND (c.totalVocal BETWEEN :startCount AND :endCount) " +
                        "AND (:status IS NULL OR c.status = :status) " +
                        "ORDER BY " +
                        "CASE " +
                        "    WHEN :orderBy = 'createAt' THEN c.createAt " +
                        "    WHEN :orderBy = 'rating' THEN c.avgRating " +
                        "    WHEN :orderBy = 'wordCount' THEN c.totalVocal " +
                        "    WHEN :orderBy = 'name' THEN c.name " +
                        "END ASC")
        Page<CourseEntity> findAllCourseAsc(@Param("searchText") String searchText,
                        @Param("rating") int rating,
                        @Param("startCount") int startCount,
                        @Param("endCount") int endCount,
                        @Param("userEntity") UserEntity userEntity,
                        @Param("status") CourseStatus status,
                        @Param("orderBy") String orderBy,
                        Pageable pageable);

        @Query("SELECT c FROM CourseEntity c " +
                        "JOIN c.students s " +
                        "WHERE s.user = :userEntity " +
                        "AND c.deleted = false " +
                        "AND s.deleted = false " +
                        "ORDER BY s.updateAt DESC")
        List<CourseEntity> findAllCourseByStudentAndDeletedFlase(UserEntity userEntity);

        Optional<CourseEntity> findByIdAndDeletedFalse(Long id);

        Optional<CourseEntity> findByIdAndStatusAndDeletedFalse(Long id, CourseStatus status);

        Boolean existsByCodeAndDeletedFalse(String code);

        Optional<CourseEntity> findByCodeAndDeletedFalse(String code);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
}
