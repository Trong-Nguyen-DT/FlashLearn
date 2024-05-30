package com.dt.flashlearn.service.impl;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dt.flashlearn.constant.ErrorConstants;
import com.dt.flashlearn.constant.TypeImageConstants;
import com.dt.flashlearn.converter.LessonConverter;
import com.dt.flashlearn.entity.LessonEntity;
import com.dt.flashlearn.entity.Course.CourseEntity;
import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.request.LessonInput;
import com.dt.flashlearn.model.response.ResponseData;
import com.dt.flashlearn.repository.CourseRepository;
import com.dt.flashlearn.repository.LessonRepository;
import com.dt.flashlearn.service.LessonService;
import com.dt.flashlearn.service.component.ImageService;
import com.dt.flashlearn.validate.CourseValidate;

@Service
public class LessonServiceImpl implements LessonService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private ImageService imageService;

    @Autowired
    private QueryService queryService;

    @Override
    public ResponseData getAllLessonByCourse(Long courseId) {
        CourseEntity courseEntity = courseRepository.findByIdAndDeletedFalse(courseId)
                .orElseThrow(
                        () -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));

        CourseValidate.validateCoursePrivate(courseEntity);
        return new ResponseData(LessonConverter
                .convertToObjects(queryService.getAllLessonEntityByCourseEntity(courseEntity).stream()
                .map(lessonEntity -> LessonConverter.toModel(lessonEntity, calculatorVocabLearned(lessonEntity)))
                .toList()));

    }

    private int calculatorVocabLearned(LessonEntity lessonEntity) {
        return queryService.getVocabLearnedByLessonEntity(lessonEntity);
    }

    @Override
    public ResponseData getLessonById(Long lessonId) {
        LessonEntity lessonEntity = queryService.getLessonEntityById(lessonId);
        CourseValidate.validateCoursePrivate(lessonEntity.getCourse());
        return new ResponseData(LessonConverter.toModel(lessonEntity, calculatorVocabLearned(lessonEntity)));
    }

    @Override
    public ResponseData addLesson(LessonInput input) {
        CourseEntity courseEntity = queryService.getCourseEntityById(input.getCourseId());
        LocalDateTime now = LocalDateTime.now();
        LessonEntity lessonEntity = new LessonEntity();
        lessonEntity.setName(input.getName());
        lessonEntity.setDescription(input.getDescription());
        lessonEntity.setImage(
                input.getImage() != null ? imageService.upload(input.getImage(), TypeImageConstants.LESSON_IMAGE)
                        : null);
        lessonEntity.setTotalVocabOfLesson(0L);
        lessonEntity.setCourse(courseEntity);
        lessonEntity.setCreateAt(now);
        lessonEntity.setUpdateAt(now);
        lessonEntity.setDeleted(false);
        return createResponseData(lessonRepository.save(lessonEntity));
    }

    @Override
    public ResponseData updateLesson(LessonInput input) {
        LessonEntity lessonEntity = queryService.getLessonEntityById(input.getId());
        CourseValidate.validateCourseOwner(lessonEntity.getCourse());
        lessonEntity.setName(input.getName());
        lessonEntity.setDescription(input.getDescription());
        if (input.getImage() != null) {
            lessonEntity.setImage(imageService.upload(input.getImage(), TypeImageConstants.LESSON_IMAGE));
        }
        lessonEntity.setUpdateAt(LocalDateTime.now());
        return createResponseData(lessonRepository.save(lessonEntity));
    }

    @Override
    public ResponseData deleteLesson(Long id) {
        LessonEntity lessonEntity = queryService.getLessonEntityById(id);
        CourseValidate.validateCourseOwner(lessonEntity.getCourse());
        lessonEntity.setDeleted(true);
        lessonEntity.setUpdateAt(LocalDateTime.now());
        return createResponseData(lessonRepository.save(lessonEntity));
    }

    private ResponseData createResponseData(LessonEntity lessonEntity) {
        return new ResponseData(LessonConverter.toModelLesson(lessonEntity));
    }
}
