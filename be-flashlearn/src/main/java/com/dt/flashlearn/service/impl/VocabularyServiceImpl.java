package com.dt.flashlearn.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dt.flashlearn.converter.VocabularyConverter;
import com.dt.flashlearn.model.response.ResponseData;
import com.dt.flashlearn.repository.VocabularyRepository;
import com.dt.flashlearn.service.VocabularyService;

@Service
public class VocabularyServiceImpl implements VocabularyService {

    @Autowired
    private VocabularyRepository vocabularyRepository;

    @Override
    public ResponseData getAllVocabulary() {
        return new ResponseData(
                vocabularyRepository.findByDeletedFalse().stream().map(VocabularyConverter::toModel).toList());
    }

}
