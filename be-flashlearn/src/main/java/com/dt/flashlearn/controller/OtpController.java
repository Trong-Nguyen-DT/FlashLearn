package com.dt.flashlearn.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.request.OtpInput;
import com.dt.flashlearn.model.response.ResponseError;
import com.dt.flashlearn.service.OtpService;
import com.dt.flashlearn.service.component.ResponseHandler;
import com.dt.flashlearn.validate.ValidateData;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("api/otp")
public class OtpController {

    @Autowired
    private OtpService otpService;

    @Autowired
    private ResponseHandler responseHandler;
    
    @PostMapping("/generateOtp")
    public ResponseEntity<?> getMethodName(@Valid @RequestBody OtpInput input) {
        try {
            ValidateData.validateNotNull(input.getIsSignUp());
            return ResponseEntity.ok(responseHandler.createSuccessResponse(otpService.generateOtp(input)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseError handleValidationExceptions(MethodArgumentNotValidException ex) {
        return responseHandler.handleValidationExceptions(ex);
    }
    
}
