package com.dt.flashlearn.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dt.flashlearn.constant.SuccessConstants;
import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.response.ResponseBody;
import com.dt.flashlearn.model.response.ResponseData;
import com.dt.flashlearn.model.response.ResponseError;
import com.dt.flashlearn.service.LessonService;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("api/lessons")
public class LessonController {

    @Autowired
    private LessonService lessonService;
    
    @GetMapping()
    public ResponseEntity<?> getAllLessonByCourse(@RequestParam Long courseId) {
        try {
            return ResponseEntity.ok(createSuccessResponse(lessonService.getAllLessonByCourse(courseId)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(createErrorResponse(e));
        }
    }

    @GetMapping("{lessonId}")
    public ResponseEntity<?> getLessonById(@PathVariable Long lessonId) {
        try {
            return ResponseEntity.ok(createSuccessResponse(lessonService.getLessonById(lessonId)));
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
    
}
