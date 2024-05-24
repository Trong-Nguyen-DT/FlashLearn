package com.dt.flashlearn.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dt.flashlearn.entity.LessonEntity;
import com.dt.flashlearn.entity.VocabularyOfLessonEntity;
import com.dt.flashlearn.model.response.ResponseData;
import com.dt.flashlearn.service.LearnService;
import com.dt.flashlearn.validate.CourseValidate;

@Service
public class LearnServiceImpl implements LearnService {

    @Autowired
    private QueryService queryService;

    @Override
    public ResponseData getVocabularyOfLessonLearn(Long lessonId, int studyCount) {
        LessonEntity lessonEntity = queryService.getLessonEntityById(lessonId);
        CourseValidate.validateCoursePrivate(lessonEntity.getCourse());
        List<VocabularyOfLessonEntity> vocabularies = new ArrayList<>(lessonEntity.getVocabularies());
        int startIndex = (studyCount - 1) * 2;
        int endIndex = startIndex + 2;
        if (endIndex > vocabularies.size()) {
            endIndex = vocabularies.size();
        }
        List<VocabularyOfLessonEntity> selectedVocabularies = vocabularies.subList(startIndex, endIndex);
        return new ResponseData(selectedVocabularies);
    }

    
    
}
