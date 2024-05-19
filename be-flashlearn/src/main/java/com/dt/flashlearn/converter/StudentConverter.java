package com.dt.flashlearn.converter;

import java.util.ArrayList;
import java.util.List;

import com.dt.flashlearn.entity.StudentEntity;
import com.dt.flashlearn.model.Student;

public class StudentConverter {
    public static Student toModel(StudentEntity entity){
        Student model = new Student();
        model.setId(entity.getId());
        model.setUser(UserConverter.toModel(entity.getUser()));
        model.setRating(entity.getRating());
        model.setCreateAt(entity.getCreateAt());
        model.setUpdateAt(entity.getUpdateAt());
        return model;
    }

    public static List<Object> convertToObjects(List<Student> students) {
        List<Object> objects = new ArrayList<>();
        for (Student student : students) {
            objects.add(student);
        }
        return objects;
    }
}
