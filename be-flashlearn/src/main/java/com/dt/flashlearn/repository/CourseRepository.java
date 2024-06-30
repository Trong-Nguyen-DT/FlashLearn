package com.dt.flashlearn.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dt.flashlearn.constant.OrderByConstants;
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
                "AND (:minRating IS NULL OR c.avgRating >= :minRating) " +
                "AND (:maxRating IS NULL OR c.avgRating <= :maxRating) " +
                "AND (c.totalVocal BETWEEN :startCount AND :endCount) " +
                "AND (:status IS NULL OR c.status = :status) ")
        Page<CourseEntity> findAllCourses(@Param("searchText") String searchText,
                                        @Param("minRating") int minRating,
                                        @Param("maxRating") int maxRating,
                                        @Param("startCount") int startCount,
                                        @Param("endCount") int endCount,
                                        @Param("userEntity") UserEntity userEntity,
                                        @Param("status") CourseStatus status,
                                        Pageable pageable);

        default Page<CourseEntity> findAllCourses(String searchText, int minRating, int maxRating, int startCount, int endCount, UserEntity userEntity, CourseStatus status, String orderBy, String sortBy, Pageable pageable) {
                Sort sort = Sort.by(Sort.Direction.DESC, orderBy);
                if (sortBy.equals(OrderByConstants.SORT_BY_ASC)) {
                        sort = Sort.by(Sort.Direction.ASC, orderBy);
                }
                Pageable sortedPageable = PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sort);
                return findAllCourses(searchText, minRating, maxRating, startCount, endCount, userEntity, status, sortedPageable);
        }

        @Query("SELECT c FROM CourseEntity c " +
                        "JOIN c.students s " +
                        "WHERE s.user = :userEntity " +
                        "AND c.deleted = false " +
                        "AND s.deleted = false " +
                        "ORDER BY s.updateAt DESC")
        List<CourseEntity> findAllCourseByStudentAndDeletedFalse(UserEntity userEntity);

        Optional<CourseEntity> findByIdAndDeletedFalse(Long id);

        Optional<CourseEntity> findByIdAndStatusAndDeletedFalse(Long id, CourseStatus status);

        Boolean existsByCodeAndDeletedFalse(String code);

        Optional<CourseEntity> findByCodeAndDeletedFalse(String code);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       
}
