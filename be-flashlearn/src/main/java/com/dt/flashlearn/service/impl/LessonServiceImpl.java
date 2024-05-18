package com.dt.flashlearn.service.impl;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.dt.flashlearn.constant.ErrorConstants;
import com.dt.flashlearn.constant.TypeImageConstants;
import com.dt.flashlearn.converter.LessonConverter;
import com.dt.flashlearn.entity.LessonEntity;
import com.dt.flashlearn.entity.Course.CourseEntity;
import com.dt.flashlearn.entity.User.UserEntity;
import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.request.LessonInput;
import com.dt.flashlearn.model.response.ResponseData;
import com.dt.flashlearn.repository.CourseRepository;
import com.dt.flashlearn.repository.LessonRepository;
import com.dt.flashlearn.repository.UserRepository;
import com.dt.flashlearn.service.ImageService;
import com.dt.flashlearn.service.LessonService;
import com.dt.flashlearn.validate.CourseValidate;

@Service
public class LessonServiceImpl implements LessonService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private ImageService imageService;

    @Override
    public ResponseData getAllLessonByCourse(Long courseId) {
        CourseEntity courseEntity = courseRepository.findByIdAndDeletedFalse(courseId)
                .orElseThrow(() -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));

        CourseValidate.validateCoursePrivate(courseEntity);
        return new ResponseData(courseEntity.getLessons().stream().map(LessonConverter::toModel).toList());
        
    }

    @Override
    public ResponseData getLessonById(Long lessonId) {
        LessonEntity lessonEntity = getLessonEntityById(lessonId);
        CourseValidate.validateCoursePrivate(lessonEntity.getCourse());
        return new ResponseData(LessonConverter.toModel(lessonEntity));
    }

    @Override
    public ResponseData addLesson(LessonInput input) {
        CourseEntity courseEntity = getCourseEntityById(input.getCourseId());
        LocalDateTime now = LocalDateTime.now();
        LessonEntity lessonEntity = new LessonEntity();
        lessonEntity.setName(input.getName());
        lessonEntity.setDescription(input.getDescription());
        lessonEntity.setImage(imageService.upload(input.getImage(), TypeImageConstants.LESSON_IMAGE));
        lessonEntity.setCourse(courseEntity);
        lessonEntity.setCreateAt(now);
        lessonEntity.setUpdateAt(now);
        lessonEntity.setDeleted(false);
        return new ResponseData(LessonConverter.toModel(lessonRepository.save(lessonEntity)));
    }

    @Override
    public ResponseData updateLesson(LessonInput input) {
        LessonEntity lessonEntity = checkLessonOwner(input.getId());
        lessonEntity.setName(input.getName());
        lessonEntity.setDescription(input.getDescription());
        if (input.getImage() != null) {
            lessonEntity.setImage(imageService.upload(input.getImage(), TypeImageConstants.LESSON_IMAGE));
        }
        lessonEntity.setUpdateAt(LocalDateTime.now());
        return new ResponseData(LessonConverter.toModel(lessonRepository.save(lessonEntity)));
    }

    @Override
    public ResponseData deleteLesson(Long id) {
        LessonEntity lessonEntity = checkLessonOwner(id);
        lessonEntity.setDeleted(true);
        lessonEntity.setUpdateAt(LocalDateTime.now());
        return new ResponseData(LessonConverter.toModel(lessonRepository.save(lessonEntity)));
    }

    private LessonEntity checkLessonOwner(Long lessonId) {
        LessonEntity lessonEntity = getLessonEntityById(lessonId);
        if (!lessonEntity.getCourse().getOwner().getEmail().equals(getAuthentication().getName())) {
            throwUnauthorizedException();
        }
        return lessonEntity;
    }

    private LessonEntity getLessonEntityById(Long id) {
        return lessonRepository.findByIdAndDeletedIsFalse(id)
                .orElseThrow(() -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
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
