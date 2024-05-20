package com.dt.flashlearn.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.dt.flashlearn.constant.ErrorConstants;
import com.dt.flashlearn.entity.LessonEntity;
import com.dt.flashlearn.entity.VocabularyOfLessonEntity;
import com.dt.flashlearn.entity.Course.CourseEntity;
import com.dt.flashlearn.entity.User.UserEntity;
import com.dt.flashlearn.entity.Vocabulary.VocabularyEntity;
import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.repository.LessonRepository;
import com.dt.flashlearn.repository.UserRepository;
import com.dt.flashlearn.repository.VocabularyOfLessonRepository;
import com.dt.flashlearn.repository.VocabularyRepository;
import com.dt.flashlearn.validate.CourseValidate;

@Service
public class QueryService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private VocabularyRepository vocabularyRepository;

    @Autowired
    private VocabularyOfLessonRepository vocabularyOfLessonRepository;

    protected CourseEntity getCourseEntityById(Long id) {
        return getUserEntity()
                .getCourses()
                .stream()
                .filter(course -> course.getId().equals(id) && !course.getDeleted())
                .findFirst()
                .orElseThrow(() -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
    }

    protected List<LessonEntity> getAllLessonEntityByCourseEntity(CourseEntity courseEntity) {
        return courseEntity.getLessons().stream().filter(lesson -> !lesson.getDeleted()).toList();
    }

    protected List<VocabularyOfLessonEntity> getAllVocabularyOfLessonEntityByLessonEntity(LessonEntity lessonEntity) {
        CourseValidate.validateCoursePrivate(lessonEntity.getCourse());
        return lessonEntity.getVocabularies().stream().filter(vocabulary -> !vocabulary.getDeleted()).toList();
    }

    protected VocabularyEntity getVocabularyEntityById(Long id) {
        return vocabularyRepository.findVocabularyByIdAndDeletedFalse(id)
                .orElseThrow(() -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
    }
    

    protected LessonEntity getLessonEntityById(Long id) {
        return lessonRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
    }

    protected UserEntity getUserEntity() {
        return userRepository.findUserByDeletedFalseAndEmail(getAuthentication().getName()).orElseThrow(() -> new MessageException(ErrorConstants.USER_NOT_FOUND_MESSAGE, ErrorConstants.USER_NOT_FOUND_CODE));
    }

    protected Authentication getAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName().equals("anonymousUser")) {
            throwUnauthorizedException();
        }
        return authentication;
    }

    protected void throwUnauthorizedException() {
        throw new MessageException(ErrorConstants.UNAUTHORIZED_MESSAGE, ErrorConstants.UNAUTHORIZED_CODE);
    }

    public VocabularyOfLessonEntity getVocabularyOfLessonEntityById(Long id) {
        return vocabularyOfLessonRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(() -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
    }
}
