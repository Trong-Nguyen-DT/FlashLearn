package com.dt.flashlearn.model.request;

import java.util.List;

import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class AddVocabularyOfLessonInput {
    
    @NotNull
    private Long lessonId;
    @NotNull
    private List<VocabularyOfLessonInput> vocabularies;
}
