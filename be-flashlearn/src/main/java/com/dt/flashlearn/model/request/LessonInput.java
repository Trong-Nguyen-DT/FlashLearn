package com.dt.flashlearn.model.request;

import org.springframework.web.multipart.MultipartFile;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class LessonInput {
    private Long id;
    @NotBlank(message = "Tên không được để trống")
    private String name;
    @Size(max = 1024, message = "Mô tả không quá 1024 kí tự")
    private String description;
    private MultipartFile image;
    @NotNull(message = "Id của khóa học không được để trống")
    private Long courseId;
}
