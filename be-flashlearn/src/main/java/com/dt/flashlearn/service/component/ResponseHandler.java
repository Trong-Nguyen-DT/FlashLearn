package com.dt.flashlearn.service.component;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;

import com.dt.flashlearn.constant.ErrorConstants;
import com.dt.flashlearn.constant.SuccessConstants;
import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.response.ResponseBody;
import com.dt.flashlearn.model.response.ResponseData;
import com.dt.flashlearn.model.response.ResponseError;

@Component
public class ResponseHandler {
    
    public ResponseBody createSuccessResponse(ResponseData data) {
        ResponseBody response = new ResponseBody();
        response.setCode(SuccessConstants.OK_CODE);
        response.setMessage(Arrays.asList(SuccessConstants.OK_MESSAGE));
        response.setData(data);
        return response;
    }

    public ResponseBody createCreatedResponse(ResponseData data) {
        ResponseBody response = new ResponseBody();
        response.setCode(SuccessConstants.CREATED_CODE);
        response.setMessage(Arrays.asList(SuccessConstants.CREATED_MESSAGE));
        response.setData(data);
        return response;
    }

    public ResponseError createErrorResponse(MessageException e) {
        ResponseError response = new ResponseError();
        response.setCode(e.getErrorCode());
        response.setMessage(Arrays.asList(e));
        return response;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseError handleValidationExceptions(MethodArgumentNotValidException ex) {
        ResponseError response = new ResponseError();
        response.setCode(ErrorConstants.INVALID_CREDENTIALS_CODE);
        List<Object> messages = new ArrayList<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            messages.add(new MessageException(fieldName + ": " + error.getDefaultMessage(), response.getCode()));
        });
        response.setMessage(messages);
        return response;
    }
}
