package com.dt.flashlearn.converter;

import java.util.ArrayList;
import java.util.List;

import com.dt.flashlearn.entity.StudentEntity;
import com.dt.flashlearn.entity.Course.CourseEntity;
import com.dt.flashlearn.model.Course;

public class CourseConverter {

    public static Course toModel(CourseEntity entity){
        Course model = new Course();
        model.setId(entity.getId());
        model.setCode(entity.getCode());
        model.setName(entity.getName());
        model.setDescription(entity.getDescription());
        model.setImage(entity.getImage() != null ? entity.getImage() : null);
        model.setStatus(entity.getStatus().name());
        model.setTotalVocal(entity.calculateTotalVocab());
        model.setAvgRating(entity.getAvgRating());
        model.setTotalStudent(entity.calculateTotalStudent());
        model.setTotalVocabLearned(0L);
        model.setCreateAt(entity.getCreateAt());
        model.setUpdateAt(entity.getUpdateAt());
        model.setOwner(UserConverter.toModel(entity.getOwner()));
        return model;
    }

    public static Course toModel(CourseEntity entity, StudentEntity studentEntity) {
        Course model = new Course();
        model.setId(entity.getId());
        model.setCode(entity.getCode());
        model.setName(entity.getName());
        model.setDescription(entity.getDescription());
        model.setImage(entity.getImage() != null ? entity.getImage() : null);
        model.setStatus(entity.getStatus().name());
        model.setTotalVocal(entity.calculateTotalVocab());
        model.setTotalStudent(entity.calculateTotalStudent());
        model.setAvgRating(entity.getAvgRating());
        model.setTotalVocabLearned(entity.calculateTotalVocabLearned(studentEntity));
        model.setRating(studentEntity != null ? studentEntity.getRating() : 0);
        model.setCreateAt(entity.getCreateAt());
        model.setUpdateAt(entity.getUpdateAt());
        model.setOwner(UserConverter.toModel(entity.getOwner()));
        return model;
    }
    
    public static List<Object> convertToObjects(List<Course> courses) {
        List<Object> objects = new ArrayList<>();
        for (Course user : courses) {
            objects.add(user);
        }
        return objects;
    }
}
