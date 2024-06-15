package com.dt.flashlearn.model.request;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VocabularyOfLessonsInput {
    @NotNull(message = "Id bài học không được để trống")
    private Long lessonId;
    private List<VocabularyOfLessonInput> vocabularies;
}
