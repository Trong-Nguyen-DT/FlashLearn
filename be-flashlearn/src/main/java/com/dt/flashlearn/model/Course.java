package com.dt.flashlearn.model;

import java.time.LocalDateTime;
import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Course {
    private Long id;
    private String name;
    private String description;
    private String image;
    private String status;
    private double avgRating;
    private User owner;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
    List<Student> students;
    List<Lesson> lessons;
}
