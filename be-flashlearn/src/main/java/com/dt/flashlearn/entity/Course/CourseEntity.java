package com.dt.flashlearn.entity.Course;

import java.time.LocalDateTime;
import java.util.List;

import com.dt.flashlearn.entity.LessonEntity;
import com.dt.flashlearn.entity.StudentEntity;
import com.dt.flashlearn.entity.User.UserEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "courses")
public class CourseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    private String name;

    @Size(max = 1024, message = "Mô tả không quá 1024 kí tự")
    private String description;

    private String image;

    @NotBlank
    private String status;

    private double avgRating;

    private Long totalVocal;

    private Long totalStudent;
    
    @NotNull
    @ManyToOne
    @JoinColumn(name = "ownerId")
    private UserEntity owner;

    private LocalDateTime createAt;
    private LocalDateTime updateAt;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentEntity> students;

    @OneToMany(mappedBy = "course", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<LessonEntity> lessons;

    @NotNull
    private boolean deleted;
}
