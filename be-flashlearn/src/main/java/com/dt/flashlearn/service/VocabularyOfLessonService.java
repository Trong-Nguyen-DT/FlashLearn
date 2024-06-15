package com.dt.flashlearn.service;

import com.dt.flashlearn.model.request.VocabularyOfLessonsInput;
import com.dt.flashlearn.model.response.ResponseData;

public interface VocabularyOfLessonService {

    ResponseData getVocabularyByLesson(Long lessonId);

    ResponseData updateVocabularyOfLesson(VocabularyOfLessonsInput input);
    
}
