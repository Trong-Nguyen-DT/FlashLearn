package com.dt.flashlearn.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.service.VocabularyOfLessonService;
import com.dt.flashlearn.service.VocabularyService;
import com.dt.flashlearn.service.component.ResponseHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;



@RestController
@RequestMapping("api/vocabulary")
public class VocabularyController {

    @Autowired
    private VocabularyService vocabularyService;

    @Autowired
    private VocabularyOfLessonService vocabularyOfLessonService;

    @Autowired
    private ResponseHandler responseHandler;
    
    @GetMapping()
    public ResponseEntity<?> getAllVocabulary() {
        try {
            return ResponseEntity.ok(responseHandler.createSuccessResponse(vocabularyService.getAllVocabulary()));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @GetMapping("/{lessonId}")
    public ResponseEntity<?> getVocabularyByLessonId(@PathVariable Long lessonId) {
        try {
            return ResponseEntity
                    .ok(responseHandler
                            .createSuccessResponse(vocabularyOfLessonService.getVocabularyByLesson(lessonId)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @GetMapping("similar-word")
    public ResponseEntity<?> getSimilarWord() {
        try {
            return ResponseEntity.ok(responseHandler.createSuccessResponse(vocabularyService.getSimilarWord()));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

}
