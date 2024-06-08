package com.dt.flashlearn.validate;

import java.util.Arrays;
import java.util.List;

import com.dt.flashlearn.constant.ErrorConstants;
import com.dt.flashlearn.entity.Vocabulary.PartOfSpeech;
import com.dt.flashlearn.exception.MessageException;

public class ValidateData {
    public static void validateNotNull(Object obj) {
        if (obj == null) {
            throw new MessageException(ErrorConstants.INVALID_DATA_MESSAGE, ErrorConstants.INVALID_DATA_CODE);
        }
    }

    public static PartOfSpeech validatePartOfSpeech(String partOfSpeech){
        if (PartOfSpeech.NOUN.name().equals(partOfSpeech.toUpperCase())) {
            return PartOfSpeech.NOUN;
        }
        if (PartOfSpeech.VERB.name().equals(partOfSpeech.toUpperCase())) {
            return PartOfSpeech.VERB;
        }
        if (PartOfSpeech.ADJECTIVE.name().equals(partOfSpeech.toUpperCase())) {
            return PartOfSpeech.ADJECTIVE;
        }
        if (PartOfSpeech.ADVERB.name().equals(partOfSpeech.toUpperCase())) {
            return PartOfSpeech.ADVERB;
        }
        if (PartOfSpeech.PRONOUN.name().equals(partOfSpeech.toUpperCase())) {
            return PartOfSpeech.PRONOUN;
        }
        if (PartOfSpeech.PREPOSITION.name().equals(partOfSpeech.toUpperCase())) {
            return PartOfSpeech.PREPOSITION;
        }
        if (PartOfSpeech.CONJUNCTION.name().equals(partOfSpeech.toUpperCase())) {
            return PartOfSpeech.CONJUNCTION;
        }
        if (PartOfSpeech.INTERJECTION.name().equals(partOfSpeech.toUpperCase())) {
            return PartOfSpeech.INTERJECTION;
        }
        throw new MessageException(ErrorConstants.INVALID_DATA_MESSAGE, ErrorConstants.INVALID_DATA_CODE);
    }

    public static String validateCode(String code){
        if (code.length() == 6) {
            return code.toUpperCase();
        }
        throw new MessageException(ErrorConstants.INVALID_DATA_MESSAGE, ErrorConstants.INVALID_DATA_CODE);
    }

    public static String validateOrderBy(String orderBy) {
        if (orderBy == null) {
            throw new MessageException(ErrorConstants.INVALID_DATA_MESSAGE, ErrorConstants.INVALID_DATA_CODE);
        }
        
        String lowerCaseOrderBy = orderBy.toLowerCase();
        List<String> validOrders = Arrays.asList("day", "week", "month", "total");
        
        if (validOrders.contains(lowerCaseOrderBy)) {
            return lowerCaseOrderBy;
        } else {
            throw new MessageException(ErrorConstants.INVALID_DATA_MESSAGE, ErrorConstants.INVALID_DATA_CODE);
        }
    }
    

}
