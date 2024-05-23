package com.dt.flashlearn.service;

import com.dt.flashlearn.model.request.VocabularyInput;
import com.dt.flashlearn.model.response.ResponseData;

public interface VocabularyService {

    ResponseData getAllVocabulary();

    ResponseData createNewVocabulary(VocabularyInput input);

}
