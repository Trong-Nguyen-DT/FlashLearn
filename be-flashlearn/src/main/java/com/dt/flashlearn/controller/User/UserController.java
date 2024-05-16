package com.dt.flashlearn.controller.User;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dt.flashlearn.constant.ErrorConstants;
import com.dt.flashlearn.constant.SuccessConstants;
import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.request.ChangPasswordInput;
import com.dt.flashlearn.model.request.UserInput;
import com.dt.flashlearn.model.response.ResponseBody;
import com.dt.flashlearn.model.response.ResponseData;
import com.dt.flashlearn.model.response.ResponseError;
import com.dt.flashlearn.service.UserService;

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
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("api/user")
public class UserController {

    @Autowired
    private UserService userService;
    
    @GetMapping()
    public ResponseEntity<?> getProfile() {
        try {
            return ResponseEntity.ok(createSuccessResponse(userService.getProfile()));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(createErrorResponse(e));
        }
    }

    @PutMapping()
    public ResponseEntity<?> updateProfile(@Valid @RequestBody UserInput input) {
        try {
            return ResponseEntity.ok(createSuccessResponse(userService.updateProfile(input)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(createErrorResponse(e));
        }
    }

    @PatchMapping()
    public ResponseEntity<?> updateAvatar(MultipartFile uploadFile) {
        try {
            return ResponseEntity.ok(createSuccessResponse(userService.updateAvatar(uploadFile)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(createErrorResponse(e));
        }
    }

    @PatchMapping("/change-password")
    public ResponseEntity<?> changPassword(@Valid @RequestBody ChangPasswordInput input) {
        try {
            return ResponseEntity.ok(createSuccessResponse(userService.changePassword(input)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(createErrorResponse(e));
        }
    }

    private ResponseBody createSuccessResponse(ResponseData data) {
        ResponseBody response = new ResponseBody();
        response.setCode(SuccessConstants.OK_CODE);
        response.setMessage(Arrays.asList(SuccessConstants.OK_MESSAGE));
        response.setData(data);
        return response;
    }

    private ResponseError createErrorResponse(MessageException e) {
        ResponseError response = new ResponseError();
        response.setCode(e.getErrorCode());
        response.setMessage(Arrays.asList(e));
        return response;
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
