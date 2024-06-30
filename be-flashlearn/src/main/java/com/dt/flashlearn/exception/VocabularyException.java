package com.dt.flashlearn.exception;

import java.util.List;

import com.dt.flashlearn.model.response.VocabularyResponseError;
import com.fasterxml.jackson.annotation.JsonIgnore;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VocabularyException extends RuntimeException{
    private int errorCode;
    private List<VocabularyResponseError> errorMessage;

    public VocabularyException(Throwable throwable) {
        super(throwable);
    }

    public VocabularyException(String msg, Throwable throwable) {
        super(msg, throwable);
    }

    public VocabularyException(String msg) {
        super(msg);
    }

    public VocabularyException(int errorCode, List<VocabularyResponseError> errorMessage) {
        super();
        this.errorCode = errorCode;
        this.errorMessage = errorMessage;
    }

    public void setErrorCode(int errorCode) {
        this.errorCode = errorCode;
    }

    public int getErrorCode() {
        return errorCode;
    }

    @Override
    public void setStackTrace(StackTraceElement[] stackTrace) {
        System.out.println("");
    }

    @JsonIgnore
    @Override
    public StackTraceElement[] getStackTrace() {
        return super.getStackTrace();
    }

    @Override
    public String toString() {
        return this.errorCode + " : " + this.getErrorMessage();
    }
}
