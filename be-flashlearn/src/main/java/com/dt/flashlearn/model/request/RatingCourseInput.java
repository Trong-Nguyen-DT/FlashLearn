package com.dt.flashlearn.model.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RatingCourseInput {
    @NotNull(message = "Id của khóa học không được để trống")
    private Long id;
    @NotNull(message = "Rating không được để trống")
    private int rating;
}
