package com.dt.flashlearn.controller.User;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.request.LearnInput;
import com.dt.flashlearn.model.response.ResponseError;
import com.dt.flashlearn.service.LearnService;
import com.dt.flashlearn.service.component.ResponseHandler;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

@RestController
@RequestMapping("api/user")
public class LearnController {

    @Autowired
    private LearnService learnService;

    @Autowired
    private ResponseHandler responseHandler;

    @GetMapping("practice/course/{courseId}/listen")
    public ResponseEntity<?> getVocabularyOfCoursePracticeListen(@PathVariable Long courseId) {
        try {
            return ResponseEntity.ok(responseHandler.createSuccessResponse(learnService.getVocabularyOfCoursePracticeListen(courseId)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @GetMapping("practice/course/{courseId}")
    public ResponseEntity<?> getVocabularyOfCoursePractice(@PathVariable Long courseId) {
        try {
            return ResponseEntity.ok(responseHandler.createSuccessResponse(learnService.getVocabularyOfCoursePractice(courseId)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @GetMapping("practice/lesson/{lessonId}")
    public ResponseEntity<?> getVocabularyOfLessonPracticeByLesson(@PathVariable Long lessonId) {
        try {
            return ResponseEntity.ok(responseHandler
                    .createSuccessResponse(learnService.getVocabularyOfLessonPracticeByLesson(lessonId)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @GetMapping("learn/lesson/{lessonId}")
    public ResponseEntity<?> getVocabularyOfLessonLearn(@PathVariable Long lessonId) {
        try {
            return ResponseEntity.ok(responseHandler
                    .createSuccessResponse(learnService.getVocabularyOfLessonLearn(lessonId)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @PostMapping("learn/{courseId}")
    public ResponseEntity<?> learnVocabulary(@PathVariable Long courseId, @RequestBody LearnInput input) {
        try {
            return ResponseEntity.ok(responseHandler.createSuccessResponse(learnService.learnVocabulary(courseId, input)));
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
