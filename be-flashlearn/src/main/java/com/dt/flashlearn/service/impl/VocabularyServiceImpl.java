package com.dt.flashlearn.service.impl;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dt.flashlearn.constant.ErrorConstants;
import com.dt.flashlearn.converter.VocabularyConverter;
import com.dt.flashlearn.entity.Vocabulary.PartOfSpeech;
import com.dt.flashlearn.entity.Vocabulary.SentenceEntity;
import com.dt.flashlearn.entity.Vocabulary.SimilarWordEntity;
import com.dt.flashlearn.entity.Vocabulary.VocabularyEntity;
import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.exception.VocabularyException;
import com.dt.flashlearn.model.request.VocabulariesInput;
import com.dt.flashlearn.model.request.VocabularyInput;
import com.dt.flashlearn.model.response.AIResponse;
import com.dt.flashlearn.model.response.ResponseData;
import com.dt.flashlearn.model.response.Sentence;
import com.dt.flashlearn.model.response.VocabularyResponseError;
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
                vocabularyRepository.findByDeletedFalseOrderByWordAsc().stream().map(VocabularyConverter::toModel).toList());
    }

    @Override
    public ResponseData createNewVocabulary(VocabularyInput input) {
        VocabularyEntity entity = createVocabularyEntity(input);
        return new ResponseData(VocabularyConverter.toModel(entity));
    }

    @Override
    @Transactional
    public ResponseData createNewVocabularies(VocabulariesInput input) {
        List<VocabularyEntity> entities = new ArrayList<>();
        List<VocabularyResponseError> errors = new ArrayList<>();
        input.getVocabularies().forEach(vocabulary -> {
            try {
                entities.add(createVocabularyEntity(vocabulary));
            } catch (MessageException e) {
                errors.add(new VocabularyResponseError(vocabulary.getWord(), e.getErrorMessage()));
            }
        });
        if (!errors.isEmpty()) {
            throw new VocabularyException(ErrorConstants.INVALID_DATA_CODE, errors);
        }
        return new ResponseData(entities.stream().map(VocabularyConverter::toModel).toList());
    }

    private VocabularyEntity createVocabularyEntity(VocabularyInput vocabulary) {
        PartOfSpeech partOfSpeech = ValidateData.validatePartOfSpeech(vocabulary.getPartOfSpeech());
        VocabularyEntity entity = vocabularyRepository
                .findByWordAndPartOfSpeech(vocabulary.getWord().toLowerCase(), partOfSpeech);
        if (entity == null) {
            AIResponse aiResponse = aiService.generateSimilarWord(vocabulary.getWord(), partOfSpeech.name());
            if (aiResponse == null) {
                throw new MessageException(ErrorConstants.SERVER_ERROR_MESSAGE, ErrorConstants.SERVER_ERROR_CODE);
            }
            if (aiResponse.isStatus()) {
                throw new MessageException(ErrorConstants.INVALID_VOCABULARY_MESSAGE,
                        ErrorConstants.INVALID_VOCABULARY_CODE);
            }
            VocabularyEntity vocabularyEntity = saveVocabulary(aiResponse.getOriginalWord(), vocabulary);
            saveSimilarWords(aiResponse.getSimilarWord(), vocabularyEntity);
            saveSentence(aiResponse.getSentences(), vocabularyEntity);
            return vocabularyEntity;
        } else {
            if (entity.isDeleted()) {
                entity.setDeleted(false);
                entity.setUpdateAt(LocalDateTime.now());
                return vocabularyRepository.save(entity);
            }
            throw new MessageException(ErrorConstants.VOCABULARY_EXIST_MESSAGE,
                    ErrorConstants.VOCABULARY_EXIST_CODE);
        }
    }

    private VocabularyEntity saveVocabulary(Word word, VocabularyInput vocabulary) {
        if (!word.getWord().equals(vocabulary.getWord())) {
            throw new MessageException(ErrorConstants.INVALID_VOCABULARY_MESSAGE,
                    ErrorConstants.INVALID_VOCABULARY_CODE);
        }
        LocalDateTime now = LocalDateTime.now();
        VocabularyEntity entity = new VocabularyEntity();
        entity.setWord(word.getWord().toLowerCase());
        entity.setMeaning(word.getMeaning().toLowerCase());
        entity.setPartOfSpeech(ValidateData.validatePartOfSpeech(vocabulary.getPartOfSpeech()));
        entity.setCreateAt(now);
        entity.setUpdateAt(now);
        entity.setDeleted(false);
        return vocabularyRepository.save(entity);
    }

    private void saveSimilarWords(List<Word> similarWords, VocabularyEntity entity) {
        LocalDateTime now = LocalDateTime.now();
        List<String> duplicateWord = new ArrayList<>();
        List<SimilarWordEntity> similarWordEntities = new ArrayList<>();
        similarWords.forEach(word -> {
            if (!word.getMeaning().equals("Từ này không có nghĩa trong tiếng Anh")) {
                boolean isDuplicate = duplicateWord.stream().anyMatch(w -> w.toLowerCase().equals(word.getWord().toLowerCase()));
                if (!word.getWord().equals(entity.getWord()) && !isDuplicate) {
                    SimilarWordEntity similarWordEntity = new SimilarWordEntity();
                    similarWordEntity.setWord(word.getWord().toLowerCase());
                    similarWordEntity.setMeaning(word.getMeaning().toLowerCase());
                    similarWordEntity.setVocabulary(entity);
                    similarWordEntity.setCreateAt(now);
                    similarWordEntity.setUpdateAt(now);
                    similarWordEntity.setDeleted(false);
                    similarWordEntities.add(similarWordEntity);
                    duplicateWord.add(word.getWord());
                }
            }
        });
        if (similarWordEntities.size() < 4){
            vocabularyRepository.delete(entity);
            throw new MessageException(ErrorConstants.INVALID_SIMILAR_WORD_MESSAGE,
                    ErrorConstants.INVALID_SIMILAR_WORD_CODE);
        }
        similarWordRepository.saveAll(similarWordEntities);
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

    @Override
    public ResponseData getSimilarWord() {
        List<VocabularyEntity> entities = new ArrayList<>();
        vocabularyRepository.findByDeletedFalseOrderByWordAsc().forEach(entity -> {
            VocabularyEntity vocabularyEntity = new VocabularyEntity();
            vocabularyEntity.setId(entity.getId());
            vocabularyEntity.setWord(entity.getWord());
            vocabularyEntity.setMeaning(entity.getMeaning());
            List<SimilarWordEntity> similarWordEntities = new ArrayList<>();
            entity.getSimilarWords().forEach(similarWord -> {
                SimilarWordEntity similarWordEntity = new SimilarWordEntity();
                similarWordEntity.setId(similarWord.getId());
                similarWordEntity.setWord(similarWord.getWord());
                similarWordEntity.setMeaning(similarWord.getMeaning());
                similarWordEntities.add(similarWordEntity);
            });
            vocabularyEntity.setSimilarWords(similarWordEntities);
            List<SentenceEntity> sentenceEntities = new ArrayList<>();
            entity.getSentences().forEach(sentence -> {
                SentenceEntity sentenceEntity = new SentenceEntity();
                sentenceEntity.setId(sentence.getId());
                sentenceEntity.setSentence(sentence.getSentence());
                sentenceEntity.setMeaning(sentence.getMeaning());
                sentenceEntities.add(sentenceEntity);
            });
            vocabularyEntity.setSentences(sentenceEntities);
            entities.add(vocabularyEntity);
            
        });
        return new ResponseData(entities);        
    }

}
