package com.dt.flashlearn.model.request;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddStudentInput {
    @NotNull
    private List<String> emailStudents;
    @NotNull
    private Long courseId;
}
