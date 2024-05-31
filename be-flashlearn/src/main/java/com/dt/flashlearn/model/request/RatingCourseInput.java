package com.dt.flashlearn.model.request;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class RatingCourseInput {
    @NotNull
    private Long id;
    @NotNull
    private int rating;
}
