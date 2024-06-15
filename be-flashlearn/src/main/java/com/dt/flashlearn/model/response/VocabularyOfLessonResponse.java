package com.dt.flashlearn.model.response;

import java.util.List;

import com.dt.flashlearn.model.VocabularyOfLesson;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VocabularyOfLessonResponse {
    private List<VocabularyOfLesson> vocabularies;
    private List<VocabularyResponseError> errors;
}
