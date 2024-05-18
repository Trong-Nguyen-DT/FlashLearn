package com.dt.flashlearn.converter;

import java.util.ArrayList;
import java.util.List;

import com.dt.flashlearn.entity.Course.CourseEntity;
import com.dt.flashlearn.model.Course;

public class CourseConverter {

    public static Course toModel(CourseEntity entity){
        Course model = new Course();
        model.setId(entity.getId());
        model.setName(entity.getName());
        model.setDescription(entity.getDescription());
        model.setImage(entity.getImage());
        model.setAvgRating(entity.getAvgRating());
        model.setStatus(entity.getStatus());
        model.setTotalVocal(entity.getTotalVocal());
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
