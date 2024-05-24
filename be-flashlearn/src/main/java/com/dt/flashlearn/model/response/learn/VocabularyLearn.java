package com.dt.flashlearn.model.response.learn;

import com.dt.flashlearn.entity.VocabularyOfLessonEntity;
import com.dt.flashlearn.entity.Vocabulary.SimilarWordEntity;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VocabularyLearn {
    private Long id;
    private String word;
    private String meaning;
    private String image;
    private boolean isCorrect;

    public VocabularyLearn(VocabularyOfLessonEntity entity){
        this.id = entity.getId();
        this.word = entity.getVocabulary().getWord();
        this.meaning = entity.getMeaning();
        if (entity.getImage() != null) {
            this.image = entity.getImage();
            
        }
        this.isCorrect = true;
    }

    public VocabularyLearn(SimilarWordEntity entity){
        this.id = entity.getId();
        this.word = entity.getWord();
        this.meaning = entity.getMeaning();
        this.isCorrect = false;
    }
}
