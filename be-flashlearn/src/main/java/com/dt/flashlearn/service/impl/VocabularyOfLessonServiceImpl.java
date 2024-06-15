package com.dt.flashlearn.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dt.flashlearn.constant.TypeImageConstants;
import com.dt.flashlearn.converter.VocabularyConverter;
import com.dt.flashlearn.entity.LessonEntity;
import com.dt.flashlearn.entity.VocabularyOfLessonEntity;
import com.dt.flashlearn.entity.Course.CourseEntity;
import com.dt.flashlearn.entity.Vocabulary.VocabularyEntity;
import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.request.VocabularyOfLessonInput;
import com.dt.flashlearn.model.request.VocabularyOfLessonsInput;
import com.dt.flashlearn.model.VocabularyOfLesson;
import com.dt.flashlearn.model.response.ResponseData;
import com.dt.flashlearn.model.response.VocabularyOfLessonResponse;
import com.dt.flashlearn.model.response.VocabularyResponseError;
import com.dt.flashlearn.repository.CourseRepository;
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
    private ImageService imageService;

    @Autowired
    private QueryService queryService;

    @Override
    public ResponseData getVocabularyByLesson(Long lessonId) {
        LessonEntity lessonEntity = queryService.getLessonEntityById(lessonId);
        return new ResponseData(queryService.getAllVocabularyOfLessonEntityByLessonEntity(lessonEntity).stream()
                .map(VocabularyConverter::vocabularyOfLessonToModel)
                .toList());
    }

    @Override
    public ResponseData updateVocabularyOfLesson(VocabularyOfLessonsInput input) {
        LessonEntity lessonEntity = queryService.getLessonEntityById(input.getLessonId());
        CourseValidate.validateCourseOwner(lessonEntity.getCourse());
        List<VocabularyOfLesson> vocabularyOfLessons = new ArrayList<>();
        List<VocabularyResponseError> errors = new ArrayList<>();
        input.getVocabularies().stream().forEach(vocabularyInput -> {
            try {
                if (vocabularyInput.getId() == null) {
                    System.out.println("vocabularyInput.getId() == null");
                    vocabularyOfLessons.add(VocabularyConverter.vocabularyOfLessonToModel(addVocabularyOfLesson(vocabularyInput, lessonEntity)));
                    
                } else {
                    if (vocabularyInput.isDelete()) {
                        vocabularyOfLessons.add(VocabularyConverter.vocabularyOfLessonToModel(deleteVocabularyOfLesson(vocabularyInput.getId())));
                    } else {
                        vocabularyOfLessons.add(VocabularyConverter.vocabularyOfLessonToModel(updateVocabularyOfLesson(vocabularyInput)));
                    }
                }
            } catch (MessageException e) {
                errors.add(new VocabularyResponseError("Từ vựng có id: " + vocabularyInput.getId() + "Không tồn tại",
                        e.getMessage()));
            }
        });
        VocabularyOfLessonResponse response = new VocabularyOfLessonResponse();
        response.setVocabularies(vocabularyOfLessons);
        response.setErrors(errors);
        return new ResponseData(response);
    }

    private VocabularyOfLessonEntity addVocabularyOfLesson(VocabularyOfLessonInput vocabularyInput, LessonEntity lessonEntity) {
        VocabularyEntity entity = queryService.getVocabularyEntityById(vocabularyInput.getVocabularyId());
        Optional<VocabularyOfLessonEntity> optionalVocabulary = lessonEntity.getVocabularies().stream()
                .filter(vocabulary -> vocabulary.getVocabulary().getId().equals(vocabularyInput.getVocabularyId()))
                .findFirst();
        if (optionalVocabulary.isPresent()) {
            VocabularyOfLessonEntity vocabulary = optionalVocabulary.get();
            if (vocabulary.isDeleted()) {
                vocabulary.setDeleted(false);
                vocabularyOfLessonRepository.save(vocabulary);
            }
            return vocabulary;
        } else {
            VocabularyOfLessonEntity newVocabulary = createVocabularyOfLessonEntity(vocabularyInput, lessonEntity, entity);
            return newVocabulary;
        }
    }

    private VocabularyOfLessonEntity createVocabularyOfLessonEntity(VocabularyOfLessonInput input, LessonEntity lessonEntity, VocabularyEntity entity) {
        LocalDateTime now = LocalDateTime.now();
        VocabularyOfLessonEntity vocabularyOfLessonEntity = new VocabularyOfLessonEntity();
        vocabularyOfLessonEntity.setLesson(lessonEntity);
        vocabularyOfLessonEntity.setVocabulary(entity);
        vocabularyOfLessonEntity.setMeaning((input.getMeaning() != null || input.getMeaning().equals("")) ? input.getMeaning() : entity.getMeaning());
        vocabularyOfLessonEntity.setImage(
                input.getImage() != null ? imageService.upload(input.getImage(), TypeImageConstants.VOCABULARY_IMAGE)
                        : null);
        vocabularyOfLessonEntity.setCreateAt(now);
        vocabularyOfLessonEntity.setUpdateAt(now);
        vocabularyOfLessonEntity.setDeleted(false);
        return vocabularyOfLessonRepository.save(vocabularyOfLessonEntity);
    }

    private VocabularyOfLessonEntity updateVocabularyOfLesson(VocabularyOfLessonInput input) {
        VocabularyOfLessonEntity vocabularyOfLessonEntity = queryService.getVocabularyOfLessonEntityById(input.getId());
        if (!vocabularyOfLessonEntity.getVocabulary().getId().equals(input.getVocabularyId())) {
            vocabularyOfLessonEntity.setVocabulary(queryService.getVocabularyEntityById(input.getVocabularyId()));
        }
        if (input.getImage() != null) {
            vocabularyOfLessonEntity
                    .setImage(imageService.upload(input.getImage(), TypeImageConstants.VOCABULARY_IMAGE));
        }
        vocabularyOfLessonEntity.setMeaning(input.getMeaning());
        vocabularyOfLessonEntity.setUpdateAt(LocalDateTime.now());
        return vocabularyOfLessonRepository.save(vocabularyOfLessonEntity);
    }

    public VocabularyOfLessonEntity deleteVocabularyOfLesson(Long id) {
        VocabularyOfLessonEntity vocabularyOfLessonEntity = queryService.getVocabularyOfLessonEntityById(id);
        CourseValidate.validateCourseOwner(vocabularyOfLessonEntity.getLesson().getCourse());
        vocabularyOfLessonEntity.setDeleted(true);
        vocabularyOfLessonEntity.setUpdateAt(LocalDateTime.now());
        vocabularyOfLessonEntity = vocabularyOfLessonRepository.save(vocabularyOfLessonEntity);

        CourseEntity courseEntity = vocabularyOfLessonEntity.getLesson().getCourse();
        courseEntity.setTotalVocal(courseEntity.calculateTotalVocab());
        courseRepository.save(courseEntity);
        return vocabularyOfLessonEntity;
    }

}
