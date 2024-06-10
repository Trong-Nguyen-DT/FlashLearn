package com.dt.flashlearn.model.response;

import java.util.List;

import com.dt.flashlearn.model.Vocabulary;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VocabulariesResponse {
    private List<Vocabulary> vocabularies;
    private List<VocabularyResponseError> errors;
}
