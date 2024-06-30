package com.dt.flashlearn.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class RestErrorHandler {
    
    private static final Logger logger = LoggerFactory.getLogger(MessageException.class);

    @ExceptionHandler(MessageException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public Object processValidationError(MessageException ex) {
        String result = ex.getErrorMessage();
        logger.error("Error Message {}", result);
        return ex;
    }

    @ExceptionHandler(VocabularyException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ResponseBody
    public Object processValidationError(VocabularyException ex) {
        String result = ex.getErrorMessage().toString();
        logger.error("Vocabulary error Message {}", result);
        return ex;
    }
}
