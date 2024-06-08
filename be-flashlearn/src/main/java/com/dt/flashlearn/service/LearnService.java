package com.dt.flashlearn.service;

import com.dt.flashlearn.model.request.LearnInput;
import com.dt.flashlearn.model.response.ResponseData;

public interface LearnService {

    ResponseData getVocabularyOfLessonLearn(Long lessonId);

    ResponseData getVocabularyOfLessonPracticeByLesson(Long lessonId);

    ResponseData getVocabularyOfCoursePractice(Long courseId);

    ResponseData learnVocabulary(Long courseId, LearnInput input);

    ResponseData getVocabularyOfCoursePracticeListen(Long courseId);

}
