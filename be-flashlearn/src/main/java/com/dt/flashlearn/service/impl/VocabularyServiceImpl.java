package com.dt.flashlearn.service.impl;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dt.flashlearn.constant.ErrorConstants;
import com.dt.flashlearn.converter.VocabularyConverter;
import com.dt.flashlearn.entity.Vocabulary.SentenceEntity;
import com.dt.flashlearn.entity.Vocabulary.SimilarWordEntity;
import com.dt.flashlearn.entity.Vocabulary.VocabularyEntity;
import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.request.VocabularyInput;
import com.dt.flashlearn.model.response.AIResponse;
import com.dt.flashlearn.model.response.ResponseData;
import com.dt.flashlearn.model.response.Sentence;
import com.dt.flashlearn.model.response.Word;
import com.dt.flashlearn.repository.SentenceRepository;
import com.dt.flashlearn.repository.SimilarWordRepository;
import com.dt.flashlearn.repository.VocabularyRepository;
import com.dt.flashlearn.service.VocabularyService;
import com.dt.flashlearn.service.component.AIService;
import com.dt.flashlearn.validate.ValidateData;

@Service
public class VocabularyServiceImpl implements VocabularyService {

    @Autowired
    private VocabularyRepository vocabularyRepository;

    @Autowired
    private SimilarWordRepository similarWordRepository;

    @Autowired
    private SentenceRepository sentenceRepository;

    @Autowired
    private AIService aiService;

    @Override
    public ResponseData getAllVocabulary() {
        return new ResponseData(
                vocabularyRepository.findByDeletedFalse().stream().map(VocabularyConverter::toModel).toList());
    }

    @Override
    public ResponseData createNewVocabulary(VocabularyInput input) {
        VocabularyEntity entity = vocabularyRepository
                .findByWordAndPartOfSpeech(input.getWord(), ValidateData.validatePartOfSpeech(input.getPartOfSpeech()));

        if (entity != null) {
            if (entity.isDeleted()) {
                entity.setDeleted(false);
                entity.setUpdateAt(LocalDateTime.now());
                return new ResponseData(VocabularyConverter.toModel(vocabularyRepository.save(entity)));
            } 
            throw new MessageException(ErrorConstants.VOCABULARY_EXIST_MESSAGE,
                        ErrorConstants.VOCABULARY_EXIST_CODE);
        } else {
            AIResponse aiResponse = aiService.generateSimilarWord(input.getWord(), input.getPartOfSpeech());
            if (aiResponse == null) {
                throw new MessageException(ErrorConstants.SERVER_ERROR_MESSAGE, ErrorConstants.SERVER_ERROR_CODE);
            }
            if (aiResponse.isStatus()) {
                throw new MessageException(ErrorConstants.INVALID_VOCABULARY_MESSAGE,
                        ErrorConstants.INVALID_VOCABULARY_CODE);
            }
            VocabularyEntity vocabularyEntity = saveVocabulary(aiResponse.getOriginalWord(), input);
            saveSimilarWords(aiResponse.getSimilarWord(), vocabularyEntity);
            saveSentence(aiResponse.getSentences(), vocabularyEntity);
            return new ResponseData(VocabularyConverter.toModel(vocabularyEntity));
        }
    }

    private VocabularyEntity saveVocabulary(Word word, VocabularyInput vocabulary) {
        if (!word.getWord().equals(vocabulary.getWord())) {
            throw new MessageException(ErrorConstants.INVALID_VOCABULARY_MESSAGE,
                    ErrorConstants.INVALID_VOCABULARY_CODE);
        }
        LocalDateTime now = LocalDateTime.now();
        VocabularyEntity entity = new VocabularyEntity();
        entity.setWord(word.getWord());
        entity.setMeaning(word.getMeaning());
        entity.setPartOfSpeech(ValidateData.validatePartOfSpeech(vocabulary.getPartOfSpeech()));
        entity.setCreateAt(now);
        entity.setUpdateAt(now);
        entity.setDeleted(false);
        return vocabularyRepository.save(entity);
    }

    private void saveSimilarWords(List<Word> similarWords, VocabularyEntity entity) {
        LocalDateTime now = LocalDateTime.now();
        similarWords.forEach(word -> {
            boolean isDuplicate = similarWords.stream().anyMatch(w -> w.getWord().equals(word.getWord()));
            if (!word.getWord().equals(entity.getWord()) && !isDuplicate) {
                SimilarWordEntity similarWordEntity = new SimilarWordEntity();
                similarWordEntity.setWord(word.getWord());
                similarWordEntity.setMeaning(word.getMeaning());
                similarWordEntity.setVocabulary(entity);
                similarWordEntity.setCreateAt(now);
                similarWordEntity.setUpdateAt(now);
                similarWordEntity.setDeleted(false);
                similarWordRepository.save(similarWordEntity);
            }
        });
    }

    private void saveSentence(List<Sentence> sentences, VocabularyEntity entity) {
        LocalDateTime now = LocalDateTime.now();
        sentences.forEach(sentence -> {
            SentenceEntity sentenceEntity = new SentenceEntity();
            sentenceEntity.setSentence(sentence.getSentence());
            sentenceEntity.setMeaning(sentence.getMeaning());
            sentenceEntity.setVocabulary(entity);
            sentenceEntity.setCreateAt(now);
            sentenceEntity.setUpdateAt(now);
            sentenceEntity.setDeleted(false);
            sentenceRepository.save(sentenceEntity);
        });
    }

}
