package com.dt.flashlearn.model.request;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddVocabularyOfLessonInput {
    
    @NotNull(message = "Id của bài học không được để trống")
    private Long lessonId;
    @NotNull(message = "Danh sách từ vựng không được để trống")
    private List<VocabularyOfLessonInput> vocabularies;
}
