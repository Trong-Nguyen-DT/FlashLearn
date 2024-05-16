package com.dt.flashlearn.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.dt.flashlearn.constant.ErrorConstants;
import com.dt.flashlearn.constant.SuccessConstants;
import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.request.EmailInput;
import com.dt.flashlearn.model.response.ResponseBody;
import com.dt.flashlearn.model.response.ResponseError;
import com.dt.flashlearn.service.OtpService;

import jakarta.validation.Valid;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("api/otp")
public class OtpController {

    @Autowired
    private OtpService otpService;
    
    @GetMapping("/generateOtp")
    public ResponseEntity<?> getMethodName(@Valid @RequestBody EmailInput input) {
        try {
            ResponseBody body = new ResponseBody();
            body.setCode(SuccessConstants.OK_CODE);
            body.setMessage(Arrays.asList(SuccessConstants.OK_MESSAGE));
            body.setData(otpService.generateOtp(input));
            return ResponseEntity.ok(body);
        } catch (MessageException e) {
            ResponseError response = new ResponseError();
            response.setCode(e.getErrorCode());
            response.setMessage(Arrays.asList(e));
            return ResponseEntity.status(e.getErrorCode()).body(response);
        }
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseError handleValidationExceptions(MethodArgumentNotValidException ex){
        ResponseError response = new ResponseError();
        response.setCode(ErrorConstants.INVALID_CREDENTIALS_CODE);
        List<Object> messages = new ArrayList<>();
        ex.getBindingResult().getAllErrors().forEach((error)->{
            String fieldName = ((FieldError) error).getField();
            messages.add(new MessageException(fieldName + ": " + error.getDefaultMessage(), response.getCode()));
        });
        response.setMessage(messages);
        return response;
    }
    
}
