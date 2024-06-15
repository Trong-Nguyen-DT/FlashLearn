package com.dt.flashlearn.controller.User;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.request.ChangPasswordInput;
import com.dt.flashlearn.model.request.UserInput;
import com.dt.flashlearn.model.response.ResponseError;
import com.dt.flashlearn.service.UserService;
import com.dt.flashlearn.service.component.ResponseHandler;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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

    @Autowired
    private ResponseHandler responseHandler;
    
    @GetMapping()
    public ResponseEntity<?> getProfile() {
        try {
            return ResponseEntity.ok(responseHandler.createSuccessResponse(userService.getProfile()));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @PutMapping()
    public ResponseEntity<?> updateProfile(@Valid @RequestBody UserInput input) {
        try {
            return ResponseEntity.ok(responseHandler.createSuccessResponse(userService.updateProfile(input)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @PatchMapping()
    public ResponseEntity<?> updateAvatar(MultipartFile uploadFile) {
        try {
            return ResponseEntity.ok(responseHandler.createSuccessResponse(userService.updateAvatar(uploadFile)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @PatchMapping("/change-password")
    public ResponseEntity<?> changPassword(@Valid @RequestBody ChangPasswordInput input) {
        try {
            return ResponseEntity.ok(responseHandler.createSuccessResponse(userService.changePassword(input)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ResponseError handleValidationExceptions(MethodArgumentNotValidException ex) {
        return responseHandler.handleValidationExceptions(ex);
    }
    
}
