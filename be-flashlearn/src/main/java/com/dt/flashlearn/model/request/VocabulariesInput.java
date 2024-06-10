package com.dt.flashlearn.model.request;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VocabulariesInput {
    private List<VocabularyInput> vocabularies;
}
