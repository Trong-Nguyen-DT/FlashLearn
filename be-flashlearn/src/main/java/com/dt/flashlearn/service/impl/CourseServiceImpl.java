package com.dt.flashlearn.service.impl;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.dt.flashlearn.constant.ErrorConstants;
import com.dt.flashlearn.constant.OrderByConstants;
import com.dt.flashlearn.constant.TypeImageConstants;
import com.dt.flashlearn.converter.CourseConverter;
import com.dt.flashlearn.entity.Course.CourseEntity;
import com.dt.flashlearn.entity.Course.CourseStatus;
import com.dt.flashlearn.entity.User.UserEntity;
import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.request.CourseInput;
import com.dt.flashlearn.model.response.ResponseData;
import com.dt.flashlearn.model.response.ResponsePage;
import com.dt.flashlearn.repository.CourseRepository;
import com.dt.flashlearn.repository.UserRepository;
import com.dt.flashlearn.service.CourseService;
import com.dt.flashlearn.service.ImageService;
import com.dt.flashlearn.validate.CourseValidate;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageService imageService;

    @Override
    public ResponseData getAllCoursePublic(int page, int perPage,
                                            String searchText,
                                            int rating,
                                            int startCount, int endCount,
                                            String orderBy, String sortBy) {
        Page<CourseEntity> courses;
        String status = CourseStatus.PUBLIC.name();
        if (OrderByConstants.SORT_BY_DESC.equalsIgnoreCase(sortBy.toUpperCase())) {
            courses = courseRepository.findAllCourseDesc(searchText, rating, startCount, endCount, null, status, orderBy,
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
        UserEntity userEntity = getUserEntity();
        if (OrderByConstants.SORT_BY_DESC.equalsIgnoreCase(sortBy.toUpperCase())) {
            courses = courseRepository.findAllCourseDesc(searchText, rating, startCount, endCount, userEntity, status, orderBy,
                    PageRequest.of(page - 1, perPage));
        } else {
            courses = courseRepository.findAllCourseAsc(searchText, rating, startCount, endCount, userEntity, status, orderBy,
                    PageRequest.of(page - 1, perPage));
        }
        return new ResponseData(
                CourseConverter.convertToObjects(courses.getContent().stream().map(CourseConverter::toModel).toList()),
                new ResponsePage(courses.getNumber() + 1, courses.getSize(), courses.getTotalElements(),
                        courses.getTotalPages()));
    }

    @Override
    public ResponseData createCourse(CourseInput input) {
        LocalDateTime now = LocalDateTime.now();
        CourseEntity courseEntity = new CourseEntity();
        courseEntity.setName(input.getName());
        courseEntity.setDescription(input.getDescription());
        courseEntity.setImage(imageService.upload(input.getImage(), TypeImageConstants.COURSE_IMAGE));
        courseEntity.setStatus(input.getStatus());
        courseEntity.setAvgRating(0);
        courseEntity.setTotalVocal(0L);
        courseEntity.setTotalStudent(0L);
        courseEntity.setCreateAt(now);
        courseEntity.setUpdateAt(now);
        courseEntity.setOwner(getUserEntity());
        courseEntity.setDeleted(false);
        return new ResponseData(CourseConverter.toModel(courseRepository.save(courseEntity)));
    }

    
    @Override
    public ResponseData updateCourse(CourseInput input) {
        CourseEntity courseEntity = getCourseEntityById(input.getId());
        courseEntity.setName(input.getName());
        courseEntity.setDescription(input.getDescription());
        courseEntity.setStatus(input.getStatus());
        if (input.getImage() != null) {
            courseEntity.setImage(imageService.upload(input.getImage(), TypeImageConstants.COURSE_IMAGE));
        }
        courseEntity.setUpdateAt(LocalDateTime.now());
        courseRepository.save(courseEntity);
        return new ResponseData(CourseConverter.toModel(courseEntity));
    }

    @Override
    public ResponseData deleteCourse(Long id) {
        CourseEntity courseEntity = getCourseEntityById(id);
        courseEntity.setDeleted(true);
        courseRepository.save(courseEntity);
        return new ResponseData(CourseConverter.toModel(courseEntity));
    }

    @Override
    public ResponseData getCourseById(Long id) {
        CourseEntity courseEntity = courseRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
        
        CourseValidate.validateCoursePrivate(courseEntity);
        return new ResponseData(CourseConverter.toModel(courseEntity));
    }

    private CourseEntity getCourseEntityById(Long id) {
        return getUserEntity()
                .getCourses()
                .stream()
                .filter(course -> course.getId().equals(id) && course.getDeleted().equals(false))
                .findFirst()
                .orElseThrow(() -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
    }

    private UserEntity getUserEntity() {
        return userRepository.findUserByDeletedFalseAndEmail(getAuthentication().getName()).orElseThrow(() -> new MessageException(ErrorConstants.USER_NOT_FOUND_MESSAGE, ErrorConstants.USER_NOT_FOUND_CODE));
    }

    private Authentication getAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName().equals("anonymousUser")) {
            throwUnauthorizedException();
        }
        return authentication;
    }

    private void throwUnauthorizedException() {
        throw new MessageException(ErrorConstants.UNAUTHORIZED_MESSAGE, ErrorConstants.UNAUTHORIZED_CODE);
    }

}
