package com.dt.flashlearn.service.impl;

import java.time.LocalDateTime;
import java.util.Random;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.dt.flashlearn.constant.ErrorConstants;
import com.dt.flashlearn.constant.OrderByConstants;
import com.dt.flashlearn.constant.TypeImageConstants;
import com.dt.flashlearn.converter.CourseConverter;
import com.dt.flashlearn.entity.StudentEntity;
import com.dt.flashlearn.entity.Course.CourseEntity;
import com.dt.flashlearn.entity.Course.CourseStatus;
import com.dt.flashlearn.entity.User.UserEntity;
import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.request.CourseInput;
import com.dt.flashlearn.model.request.RatingCourseInput;
import com.dt.flashlearn.model.response.ResponseData;
import com.dt.flashlearn.model.response.ResponsePage;
import com.dt.flashlearn.repository.CourseRepository;
import com.dt.flashlearn.repository.StudentRepository;
import com.dt.flashlearn.service.CourseService;
import com.dt.flashlearn.service.component.ImageService;
import com.dt.flashlearn.validate.CourseValidate;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private ImageService imageService;

    @Autowired
    private QueryService queryService;

    @Override
    public ResponseData getAllCoursePublic(int page, int perPage,
            String searchText,
            int rating,
            int startCount, int endCount,
            String orderBy, String sortBy) {
        Page<CourseEntity> courses;
        String status = CourseStatus.PUBLIC.name();
        if (OrderByConstants.SORT_BY_DESC.equalsIgnoreCase(sortBy.toUpperCase())) {
            courses = courseRepository.findAllCourseDesc(searchText, rating, startCount, endCount, null, status,
                    orderBy,
                    PageRequest.of(page - 1, perPage));
        } else {
            courses = courseRepository.findAllCourseAsc(searchText, rating, startCount, endCount, null, status, orderBy,
                    PageRequest.of(page - 1, perPage));
        }
        return new ResponseData(
                CourseConverter.convertToObjects(courses.getContent().stream().map(CourseConverter::toModel).toList()),
                new ResponsePage(courses.getNumber() + 1, courses.getSize(), courses.getTotalElements(),
                        courses.getTotalPages()));

    }

    @Override
    public ResponseData getAllMyCourse(int page, int perPage,
            String searchText,
            int rating,
            int startCount, int endCount,
            String status,
            String orderBy, String sortBy) {
        Page<CourseEntity> courses;
        UserEntity userEntity = queryService.getUserEntity();
        if (OrderByConstants.SORT_BY_DESC.equalsIgnoreCase(sortBy.toUpperCase())) {
            courses = courseRepository.findAllCourseDesc(searchText, rating, startCount, endCount, userEntity, status,
                    orderBy,
                    PageRequest.of(page - 1, perPage));
        } else {
            courses = courseRepository.findAllCourseAsc(searchText, rating, startCount, endCount, userEntity, status,
                    orderBy,
                    PageRequest.of(page - 1, perPage));
        }
        return new ResponseData(
                CourseConverter.convertToObjects(courses.getContent().stream().map(CourseConverter::toModel).toList()),
                new ResponsePage(courses.getNumber() + 1, courses.getSize(), courses.getTotalElements(),
                        courses.getTotalPages()));
    }

    @Override
    public ResponseData getAllMyCourseStudy() {
        UserEntity userEntity = queryService.getUserEntity();
        return new ResponseData(
                CourseConverter.convertToObjects(courseRepository.findAllCourseByStudents(userEntity).stream()
                        .map(CourseConverter::toModel).toList()));
    }

    @Override
    public ResponseData createCourse(CourseInput input) {
        LocalDateTime now = LocalDateTime.now();
        CourseEntity courseEntity = new CourseEntity();
        courseEntity.setName(input.getName());
        courseEntity.setDescription(input.getDescription());
        courseEntity.setImage(
                input.getImage() != null ? imageService.upload(input.getImage(), TypeImageConstants.COURSE_IMAGE)
                        : null);
        courseEntity.setStatus(input.getStatus());
        courseEntity.setAvgRating(0);
        courseEntity.setTotalVocal(0L);
        courseEntity.setTotalStudent(0L);
        courseEntity.setCreateAt(now);
        courseEntity.setUpdateAt(now);
        courseEntity.setOwner(queryService.getUserEntity());
        courseEntity.setCode(generateUniqueCourseCode());
        courseEntity.setDeleted(false);
        return createResponseData(courseRepository.save(courseEntity));
    }

    private String generateUniqueCourseCode() {
        String courseCode;
        do {
            courseCode = generateRandomUpperCaseString(6);
        } while (courseRepository.existsByCodeAndDeletedFalse(courseCode));
        return courseCode;
    }

    private String generateRandomUpperCaseString(int length) {
        String characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        StringBuilder result = new StringBuilder(length);
        Random random = new Random();
        for (int i = 0; i < length; i++) {
            result.append(characters.charAt(random.nextInt(characters.length())));
        }
        return result.toString();
    }

    @Override
    public ResponseData updateCourse(CourseInput input) {
        CourseEntity courseEntity = queryService.getCourseEntityOnwerById(input.getId());
        courseEntity.setName(input.getName());
        courseEntity.setDescription(input.getDescription());
        courseEntity.setStatus(input.getStatus());
        if (input.getImage() != null) {
            courseEntity.setImage(imageService.upload(input.getImage(), TypeImageConstants.COURSE_IMAGE));
        }
        courseEntity.setUpdateAt(LocalDateTime.now());
        courseRepository.save(courseEntity);
        return createResponseData(courseRepository.save(courseEntity));
    }

    @Override
    public ResponseData deleteCourse(Long id) {
        CourseEntity courseEntity = queryService.getCourseEntityOnwerById(id);
        courseEntity.setDeleted(true);
        courseRepository.save(courseEntity);
        return createResponseData(courseRepository.save(courseEntity));
    }

    @Override
    public ResponseData getCourseById(Long id) {
        CourseEntity courseEntity = courseRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(
                        () -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));

        CourseValidate.validateCoursePrivate(courseEntity);
        return createResponseData(courseRepository.save(courseEntity));
    }

    @Override
    public ResponseData ratingCourse(RatingCourseInput input) {
        CourseEntity courseEntity = queryService.getCourseEntityById(input.getId());
        StudentEntity studentEntity = queryService.getStudentEntity(courseEntity);
        double avgRatingNew = calculatorRatingCourse(courseEntity, input.getRating(), studentEntity);
        courseEntity.setAvgRating(avgRatingNew);
        return createResponseData(courseRepository.save(courseEntity));

    }

    private double calculatorRatingCourse(CourseEntity courseEntity, int rating, StudentEntity studentEntity) {
        double avgRating = courseEntity.getAvgRating();
        long totalStudentRated = courseEntity.getStudents().stream()
                .filter(student -> student.getRating() > 0)
                .count();
        if (studentEntity.getRating() > 0) {
            avgRating = (avgRating * totalStudentRated - studentEntity.getRating() + rating) / totalStudentRated;
        } else {
            avgRating = (avgRating * totalStudentRated + rating) / (totalStudentRated + 1);
        }
        studentEntity.setRating(rating);
        studentRepository.save(studentEntity);
        return avgRating;


    }

    private ResponseData createResponseData(CourseEntity courseEntity) {
        return new ResponseData(CourseConverter.toModel(courseEntity));
    }

}
