package com.dt.flashlearn.converter;

import com.dt.flashlearn.entity.VocabularyOfLessonEntity;
import com.dt.flashlearn.entity.Vocabulary.SimilarWordEntity;
import com.dt.flashlearn.entity.Vocabulary.VocabularyEntity;
import com.dt.flashlearn.model.SimilarWord;
import com.dt.flashlearn.model.Vocabulary;
import com.dt.flashlearn.model.VocabularyOfLesson;

public class VocabularyConverter {

    public static Vocabulary toModel(VocabularyEntity entity) {
        Vocabulary model = new Vocabulary();
        model.setId(entity.getId());
        model.setWord(entity.getWord());
        model.setMeaning(entity.getMeaning());
        model.setImage(entity.getImage());
        model.setAudio(entity.getAudio());
        model.setPartOfSpeech(entity.getPartOfSpeech());
        model.setCreateAt(entity.getCreateAt());
        model.setUpdateAt(entity.getUpdateAt());
        return model;
    }

    public static VocabularyOfLesson vocabularyOfLessonToModel(VocabularyOfLessonEntity entity) {
        VocabularyOfLesson model = new VocabularyOfLesson();
        model.setId(entity.getId());
        model.setVocabulary(toModel(entity.getVocabulary()));
        model.setCreateAt(entity.getCreateAt());
        model.setUpdateAt(entity.getUpdateAt());
        return model;
    }

    public static SimilarWord similarVocabularyToModel(SimilarWordEntity entity) {
        SimilarWord model = new SimilarWord();
        model.setId(entity.getId());
        model.setWord(entity.getWord());
        model.setMeaning(entity.getMeaning());
        model.setAudio(entity.getAudio());
        model.setCreateAt(entity.getCreateAt());
        model.setUpdateAt(entity.getUpdateAt());
        return model;
    }
    
}
