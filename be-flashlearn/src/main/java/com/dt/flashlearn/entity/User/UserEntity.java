package com.dt.flashlearn.entity.User;

import java.time.LocalDateTime;
import java.util.List;

import com.dt.flashlearn.entity.StudentEntity;
import com.dt.flashlearn.entity.Course.CourseEntity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "users", uniqueConstraints = {
    @UniqueConstraint(columnNames = {
            "email"
    })
})
public class UserEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotBlank
    @Size(max = 50)
    @Email(message = "Email không đúng định dạng")
    private String email;

    @NotBlank
    private String password;

    @NotBlank
    @Size(min = 3, max = 30)
    private String name;

    @Size(min = 10, max = 10, message = "Số điện thoại phải có 10 chữ số")
    private String phone;

    private String avatar;

    private String role;

    private LocalDateTime createAt;
    private LocalDateTime updateAt;

    @OneToMany(mappedBy = "owner", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<CourseEntity> courses;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<StudentEntity> students;

    @NotNull
    private boolean deleted;
    
}
