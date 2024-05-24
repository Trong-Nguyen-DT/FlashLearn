package com.dt.flashlearn.controller.User;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.response.ResponseError;
import com.dt.flashlearn.service.LearnService;
import com.dt.flashlearn.service.component.ResponseHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("api/user/learn")
public class LearnController {

    @Autowired
    private LearnService learnService;

    @Autowired
    private ResponseHandler responseHandler;

    @GetMapping("{lessonId}")
    public ResponseEntity<?> getVocabularyOfLessonLearn(@PathVariable Long lessonId,
            @RequestParam int studyCount) {
        try {
            return ResponseEntity.ok(responseHandler
                    .createSuccessResponse(learnService.getVocabularyOfLessonLearn(lessonId, studyCount)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseError handleValidationExceptions(MethodArgumentNotValidException ex) {
        return responseHandler.handleValidationExceptions(ex);
    }

}
