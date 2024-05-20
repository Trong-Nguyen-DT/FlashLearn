package com.dt.flashlearn.service;

import com.dt.flashlearn.model.request.AddVocabularyOfLessonInput;
import com.dt.flashlearn.model.request.VocabularyOfLessonInput;
import com.dt.flashlearn.model.response.ResponseData;

public interface VocabularyOfLessonService {

    ResponseData getVocabularyByLesson(Long lessonId);

    ResponseData addVocabularyOfLesson(AddVocabularyOfLessonInput input);

    ResponseData updateVocabularyOfLesson(VocabularyOfLessonInput input);

    ResponseData deleteVocabularyOfLesson(Long id);
    
}
