package com.dt.flashlearn.validate;

import com.dt.flashlearn.constant.ErrorConstants;
import com.dt.flashlearn.entity.Vocabulary.PartOfSpeech;
import com.dt.flashlearn.exception.MessageException;

public class ValidateData {
    public static void validateNotNull(Object obj) {
        if (obj == null) {
            throw new MessageException(ErrorConstants.INVALID_DATA_MESSAGE, ErrorConstants.INVALID_DATA_CODE);
        }
    }

    public static String validatePartOfSpeech(String partOfSpeech){
        if (PartOfSpeech.NOUN.name().equals(partOfSpeech.toUpperCase())) {
            return PartOfSpeech.NOUN.name();
        }
        if (PartOfSpeech.VERB.name().equals(partOfSpeech.toUpperCase())) {
            return PartOfSpeech.VERB.name();
        }
        if (PartOfSpeech.ADJECTIVE.name().equals(partOfSpeech.toUpperCase())) {
            return PartOfSpeech.ADJECTIVE.name();
        }
        if (PartOfSpeech.ADVERB.name().equals(partOfSpeech.toUpperCase())) {
            return PartOfSpeech.ADVERB.name();
        }
        if (PartOfSpeech.PRONOUN.name().equals(partOfSpeech.toUpperCase())) {
            return PartOfSpeech.PRONOUN.name();
        }
        if (PartOfSpeech.PREPOSITION.name().equals(partOfSpeech.toUpperCase())) {
            return PartOfSpeech.PREPOSITION.name();
        }
        if (PartOfSpeech.CONJUNCTION.name().equals(partOfSpeech.toUpperCase())) {
            return PartOfSpeech.CONJUNCTION.name();
        }
        if (PartOfSpeech.INTERJECTION.name().equals(partOfSpeech.toUpperCase())) {
            return PartOfSpeech.INTERJECTION.name();
        }
        throw new MessageException(ErrorConstants.INVALID_DATA_MESSAGE, ErrorConstants.INVALID_DATA_CODE);
    }

    public static String validateCode(String code){
        if (code.length() == 6) {
            return code.toUpperCase();
        }
        throw new MessageException(ErrorConstants.INVALID_DATA_MESSAGE, ErrorConstants.INVALID_DATA_CODE);
    }

}
