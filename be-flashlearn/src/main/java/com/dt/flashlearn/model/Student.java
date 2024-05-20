package com.dt.flashlearn.model;

import java.time.LocalDateTime;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Student {
    private Long id;
    private User user;
    private Course course;
    private int rating;
    private LocalDateTime createAt;
    private LocalDateTime updateAt;
}
