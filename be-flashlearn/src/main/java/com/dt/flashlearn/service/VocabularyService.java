package com.dt.flashlearn.service;

import com.dt.flashlearn.model.request.VocabulariesInput;
import com.dt.flashlearn.model.request.VocabularyInput;
import com.dt.flashlearn.model.response.ResponseData;

public interface VocabularyService {

    ResponseData getAllVocabulary();

    ResponseData createNewVocabulary(VocabularyInput input);

    ResponseData createNewVocabularies(VocabulariesInput input);

    ResponseData getSimilarWord();

}
