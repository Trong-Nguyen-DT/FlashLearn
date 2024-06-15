package com.dt.flashlearn.controller.User;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.request.LessonInput;
import com.dt.flashlearn.model.response.ResponseError;
import com.dt.flashlearn.service.LessonService;
import com.dt.flashlearn.service.component.ResponseHandler;
import com.dt.flashlearn.validate.ValidateData;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("api/user/lesson")
public class LessonUserController {

    @Autowired
    private LessonService lessonService;

    @Autowired
    private ResponseHandler responseHandler;
    
    @PostMapping()
    public ResponseEntity<?> addLesson(@Valid LessonInput input) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(responseHandler.createCreatedResponse(lessonService.addLesson(input)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @PutMapping()
    public ResponseEntity<?> updateLesson(@Valid LessonInput input) {
        try {
            ValidateData.validateNotNull(input.getId());
            return ResponseEntity.ok(responseHandler.createSuccessResponse(lessonService.updateLesson(input)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteLesson(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(responseHandler.createSuccessResponse(lessonService.deleteLesson(id)));
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
