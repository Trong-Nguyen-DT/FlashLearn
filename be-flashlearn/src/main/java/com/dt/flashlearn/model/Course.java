package com.dt.flashlearn.model;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Course {
    private Long id;
    private String code;
    private String name;
    private String description;
    private String image;
    private String status;
    private double avgRating;
    private User owner;
    private Long totalVocal;
    private Long totalStudent;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
}
