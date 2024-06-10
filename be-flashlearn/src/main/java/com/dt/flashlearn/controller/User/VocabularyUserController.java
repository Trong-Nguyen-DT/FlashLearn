package com.dt.flashlearn.controller.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.request.AddVocabularyOfLessonInput;
import com.dt.flashlearn.model.request.VocabulariesInput;
import com.dt.flashlearn.model.request.VocabularyInput;
import com.dt.flashlearn.model.request.VocabularyOfLessonInput;
import com.dt.flashlearn.model.response.ResponseError;
import com.dt.flashlearn.service.VocabularyOfLessonService;
import com.dt.flashlearn.service.VocabularyService;
import com.dt.flashlearn.service.component.ResponseHandler;
import com.dt.flashlearn.validate.ValidateData;

import jakarta.validation.Valid;

import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("api/user/vocabulary")
public class VocabularyUserController {

    @Autowired
    private VocabularyOfLessonService vocabularyOfLessonService;

    @Autowired
    private VocabularyService vocabularyService;

    @Autowired
    private ResponseHandler responseHandler;

    @PostMapping("/create-vocabulary")
    public ResponseEntity<?> createNewVocabulary(@Valid @RequestBody VocabularyInput input) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(responseHandler.createSuccessResponse(vocabularyService.createNewVocabulary(input)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @PostMapping("/create-vocabularies")
    public ResponseEntity<?> createNewVocabularies(@Valid @RequestBody VocabulariesInput input) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(responseHandler.createSuccessResponse(vocabularyService.createNewVocabularies(input)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }
    

    @PostMapping()
    public ResponseEntity<?> addVocabularyOfLesson(@Valid AddVocabularyOfLessonInput input) {
        try {
            return ResponseEntity
                    .ok(responseHandler.createSuccessResponse(vocabularyOfLessonService.addVocabularyOfLesson(input)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @PutMapping()
    public ResponseEntity<?> updateVocabularyOfLesson(@Valid VocabularyOfLessonInput input) {
        try {
            ValidateData.validateNotNull(input.getId());
            return ResponseEntity
                    .ok(responseHandler
                            .createSuccessResponse(vocabularyOfLessonService.updateVocabularyOfLesson(input)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @DeleteMapping("{id}")
    public ResponseEntity<?> deleteVocabularyOfLesson(@PathVariable Long id) {
        try {
            return ResponseEntity
                    .ok(responseHandler.createSuccessResponse(vocabularyOfLessonService.deleteVocabularyOfLesson(id)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseError handleValidationExceptions(MethodArgumentNotValidException ex) {
        return responseHandler.handleValidationExceptions(ex);
    }

}
