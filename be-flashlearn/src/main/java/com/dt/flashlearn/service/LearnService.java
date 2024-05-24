package com.dt.flashlearn.service;

import com.dt.flashlearn.model.response.ResponseData;

public interface LearnService {

    ResponseData getVocabularyOfLessonLearn(Long lessonId, int studyCount);
    
}
