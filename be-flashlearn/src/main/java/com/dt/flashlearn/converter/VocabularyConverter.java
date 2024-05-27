package com.dt.flashlearn.converter;

import java.util.ArrayList;
import java.util.List;

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
        model.setImage(entity.getImage());
        model.setMeaning(entity.getMeaning());
        model.setCreateAt(entity.getCreateAt() != null ? entity.getCreateAt() : null);
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

    public static List<Object> convertToObjects(List<Vocabulary> vocabularies) {
        List<Object> objects = new ArrayList<>();
        for (Vocabulary vocabulary : vocabularies) {
            objects.add(vocabulary);
        }
        return objects;
    }

    public static List<Object> convertToObjectsVocabularyOfLesson(List<VocabularyOfLesson> vocabularies) {
        List<Object> objects = new ArrayList<>();
        for (VocabularyOfLesson vocabulary : vocabularies) {
            objects.add(vocabulary);
        }
        return objects;
    }

    public static Vocabulary vocabularyOfLessonToVocabulary(VocabularyOfLessonEntity entity) {
        Vocabulary vocabulary = new Vocabulary();
        vocabulary.setId(entity.getId());
        vocabulary.setWord(entity.getVocabulary().getWord());
        vocabulary.setMeaning(entity.getVocabulary().getMeaning());
        vocabulary.setAudio(entity.getVocabulary().getAudio());
        vocabulary.setPartOfSpeech(entity.getVocabulary().getPartOfSpeech());
        vocabulary.setCreateAt(entity.getVocabulary().getCreateAt());
        vocabulary.setUpdateAt(entity.getVocabulary().getUpdateAt());
        return vocabulary;
    }
    
}
