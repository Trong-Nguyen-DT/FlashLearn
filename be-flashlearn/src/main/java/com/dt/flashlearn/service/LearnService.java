package com.dt.flashlearn.service;

import com.dt.flashlearn.model.request.LearnInput;
import com.dt.flashlearn.model.response.ResponseData;

public interface LearnService {

    ResponseData getVocabularyOfLessonLearn(Long lessonId, int studyCount);

    ResponseData getVocabularyOfLessonPractice(Long lessonId);

    ResponseData learnVocabulary(Long lessonId, LearnInput input);

    ResponseData practiceVocabulary(Long lessonId, LearnInput input);

}
