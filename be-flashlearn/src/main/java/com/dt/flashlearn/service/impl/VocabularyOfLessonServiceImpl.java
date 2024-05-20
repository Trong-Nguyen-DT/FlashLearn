package com.dt.flashlearn.service.impl;

import java.time.LocalDateTime;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dt.flashlearn.constant.TypeImageConstants;
import com.dt.flashlearn.converter.VocabularyConverter;
import com.dt.flashlearn.entity.LessonEntity;
import com.dt.flashlearn.entity.VocabularyOfLessonEntity;
import com.dt.flashlearn.entity.Course.CourseEntity;
import com.dt.flashlearn.model.request.VocabularyOfLessonInput;
import com.dt.flashlearn.model.request.AddVocabularyOfLessonInput;
import com.dt.flashlearn.model.response.ResponseData;
import com.dt.flashlearn.repository.CourseRepository;
import com.dt.flashlearn.repository.LessonRepository;
import com.dt.flashlearn.repository.VocabularyOfLessonRepository;
import com.dt.flashlearn.service.VocabularyOfLessonService;
import com.dt.flashlearn.service.component.ImageService;
import com.dt.flashlearn.validate.CourseValidate;

@Service
public class VocabularyOfLessonServiceImpl implements VocabularyOfLessonService {

    @Autowired
    private VocabularyOfLessonRepository vocabularyOfLessonRepository;

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private ImageService imageService;

    @Autowired
    private QueryService queryService;

    @Override
    public ResponseData getVocabularyByLesson(Long lessonId) {
        LessonEntity lessonEntity = queryService.getLessonEntityById(lessonId);
        CourseValidate.validateCoursePrivate(lessonEntity.getCourse());
        return new ResponseData(VocabularyConverter
                .convertToObjectsVocabularyOfLesson(
                        queryService.getAllVocabularyOfLessonEntityByLessonEntity(lessonEntity)
                                .stream()
                                .map(VocabularyConverter::vocabularyOfLessonToModel)
                                .toList()));
    }

    @Override
    public ResponseData addVocabularyOfLesson(AddVocabularyOfLessonInput input) {
        LessonEntity lessonEntity = queryService.getLessonEntityById(input.getLessonId());
        CourseValidate.validateCourseOwner(lessonEntity.getCourse());
        for (VocabularyOfLessonInput vocabularyInput : input.getVocabularies()) {
            lessonEntity.getVocabularies().stream()
                    .filter(vocabulary -> vocabulary.getVocabulary().getId().equals(vocabularyInput.getVocabularyId()))
                    .findFirst().ifPresentOrElse(
                            vocabulary -> {
                                if (vocabulary.getDeleted().equals(true)) {
                                    vocabulary.setDeleted(false);
                                    vocabularyOfLessonRepository.save(vocabulary);
                                }
                            },
                            () -> lessonEntity.getVocabularies()
                                    .add(createVocabularyOfLessonEntity(vocabularyInput, lessonEntity)));

        }
        lessonEntity.setTotalVocabOfLesson(calculatorVocabularyOfLesson(lessonEntity));
        lessonRepository.save(lessonEntity);
        CourseEntity courseEntity = lessonEntity.getCourse();
        courseEntity.setTotalVocal(calculatorVocabularyOfCourse(courseEntity));
        courseRepository.save(courseEntity);
        return new ResponseData(queryService
                .getAllVocabularyOfLessonEntityByLessonEntity(lessonEntity)
                .stream()
                .map(VocabularyConverter::vocabularyOfLessonToModel)
                .toList());
    }

    @Override
    public ResponseData updateVocabularyOfLesson(VocabularyOfLessonInput input) {
        VocabularyOfLessonEntity vocabularyOfLessonEntity = queryService.getVocabularyOfLessonEntityById(input.getId());
        CourseValidate.validateCourseOwner(vocabularyOfLessonEntity.getLesson().getCourse());
        if (!vocabularyOfLessonEntity.getVocabulary().getId().equals(input.getVocabularyId())) {
            vocabularyOfLessonEntity.setVocabulary(queryService.getVocabularyEntityById(input.getVocabularyId()));
        }
        if (input.getImage() != null) {
            vocabularyOfLessonEntity.setImage(imageService.upload(input.getImage(), TypeImageConstants.VOCABULARY_IMAGE));
        }
        vocabularyOfLessonEntity.setMeaning(input.getMeaning());
        vocabularyOfLessonEntity.setUpdateAt(LocalDateTime.now());
        vocabularyOfLessonRepository.save(vocabularyOfLessonEntity);
        return new ResponseData(VocabularyConverter.vocabularyOfLessonToModel(vocabularyOfLessonEntity));
    }

    @Override
    public ResponseData deleteVocabularyOfLesson(Long id) {
        VocabularyOfLessonEntity vocabularyOfLessonEntity = queryService.getVocabularyOfLessonEntityById(id);
        CourseValidate.validateCourseOwner(vocabularyOfLessonEntity.getLesson().getCourse());
        vocabularyOfLessonEntity.setDeleted(true);
        vocabularyOfLessonEntity.setUpdateAt(LocalDateTime.now());
        vocabularyOfLessonRepository.save(vocabularyOfLessonEntity);

        LessonEntity lessonEntity = vocabularyOfLessonEntity.getLesson();
        lessonEntity.setTotalVocabOfLesson(calculatorVocabularyOfLesson(lessonEntity));
        lessonRepository.save(lessonEntity);

        CourseEntity courseEntity = lessonEntity.getCourse();
        courseEntity.setTotalVocal(calculatorVocabularyOfCourse(courseEntity));
        courseRepository.save(courseEntity);
        return new ResponseData(VocabularyConverter.vocabularyOfLessonToModel(vocabularyOfLessonEntity));
    }

    private VocabularyOfLessonEntity createVocabularyOfLessonEntity(VocabularyOfLessonInput input,
            LessonEntity lessonEntity) {
        LocalDateTime now = LocalDateTime.now();
        VocabularyOfLessonEntity vocabularyOfLessonEntity = new VocabularyOfLessonEntity();
        vocabularyOfLessonEntity.setLesson(lessonEntity);
        vocabularyOfLessonEntity.setVocabulary(queryService.getVocabularyEntityById(input.getVocabularyId()));
        vocabularyOfLessonEntity.setMeaning(input.getMeaning());
        vocabularyOfLessonEntity.setImage(
                input.getImage() != null ? imageService.upload(input.getImage(), TypeImageConstants.VOCABULARY_IMAGE)
                        : null);
        vocabularyOfLessonEntity.setCreateAt(now);
        vocabularyOfLessonEntity.setUpdateAt(now);
        vocabularyOfLessonEntity.setDeleted(false);
        return vocabularyOfLessonRepository.save(vocabularyOfLessonEntity);
    }

    private Long calculatorVocabularyOfLesson(LessonEntity lessonEntity) {
        AtomicLong totalVocabulary = new AtomicLong();
        lessonEntity.getVocabularies().stream().filter(vocabulary -> vocabulary.getDeleted().equals(false))
                .forEach(vocabulary -> totalVocabulary.getAndIncrement());
        return totalVocabulary.get();
    }

    private Long calculatorVocabularyOfCourse(CourseEntity courseEntity) {
        AtomicLong totalVocabulary = new AtomicLong();
        courseEntity.getLessons().stream().forEach(lesson -> totalVocabulary.addAndGet(lesson.getTotalVocabOfLesson()));
        return totalVocabulary.get();
    }

}
