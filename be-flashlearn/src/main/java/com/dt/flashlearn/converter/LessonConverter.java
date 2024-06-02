package com.dt.flashlearn.converter;

import java.util.ArrayList;
import java.util.List;

import com.dt.flashlearn.entity.LessonEntity;
import com.dt.flashlearn.entity.StudentEntity;
import com.dt.flashlearn.model.Lesson;

public class LessonConverter {

    public static Lesson toModel(LessonEntity entity, StudentEntity studentEntity) {
        Lesson model = new Lesson();
        model.setId(entity.getId());
        model.setName(entity.getName());
        model.setDescription(entity.getDescription());
        model.setImage(entity.getImage() != null ? entity.getImage() : null);
        model.setTotalVocabOfLesson(entity.calculateTotalVocabOfLesson());
        model.setTotalVocabLearned(entity.calculateTotalVocabLearned(studentEntity));
        model.setLearned(model.getTotalVocabOfLesson() != 0 ? model.getTotalVocabLearned() == model.getTotalVocabOfLesson() : false);
        model.setCreateAt(entity.getCreateAt());
        model.setUpdateAt(entity.getUpdateAt());
        return model;
    }

    public static Lesson toModel(LessonEntity entity) {
        Lesson model = new Lesson();
        model.setId(entity.getId());
        model.setName(entity.getName());
        model.setDescription(entity.getDescription());
        model.setImage(entity.getImage() != null ? entity.getImage() : null);
        model.setTotalVocabOfLesson(entity.calculateTotalVocabOfLesson());
        model.setCreateAt(entity.getCreateAt());
        model.setUpdateAt(entity.getUpdateAt());
        return model;
    }

    public static List<Object> convertToObjects(List<Lesson> lessons) {
        List<Object> objects = new ArrayList<>();
        for (Lesson lesson : lessons) {
            objects.add(lesson);
        }
        return objects;
    }
}
