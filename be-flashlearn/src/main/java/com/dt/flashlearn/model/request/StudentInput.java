package com.dt.flashlearn.model.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class StudentInput {
    @NotNull(message = "Email của sinh viên không được để trống")
    private String email;
    @NotNull(message = "Id của khóa học không được để trống")
    private Long courseId;
}
