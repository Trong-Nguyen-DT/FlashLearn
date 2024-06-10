package com.dt.flashlearn.model.request;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddStudentInput {
    @NotNull(message = "Emails của sinh viên không được để trống")
    private List<String> emailStudents;
    @NotNull(message = "Id của khóa học không được để trống")
    private Long courseId;
}
