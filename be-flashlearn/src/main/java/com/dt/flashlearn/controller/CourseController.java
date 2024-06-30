package com.dt.flashlearn.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.service.CourseService;
import com.dt.flashlearn.service.component.ResponseHandler;
import com.dt.flashlearn.validate.CourseValidate;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

@RestController
@RequestMapping("api/course")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private ResponseHandler responseHandler;

    @GetMapping()
    public ResponseEntity<?> getAllCoursePublic(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int perPage,
            @RequestParam(defaultValue = "") String searchText,
            @RequestParam(defaultValue = "0:5") String rating,
            @RequestParam(defaultValue = "0:9999999") String wordCount,
            @RequestParam(defaultValue = "createAt:desc") String sort) {
        try {
            int[] ratingParts = CourseValidate.parseRating(rating);
            int minRating = ratingParts[0];
            int maxRating = ratingParts[1];

            int[] wordCountParts = CourseValidate.parseWordCount(wordCount);
            int startCount = wordCountParts[0];
            int endCount = wordCountParts[1];

            String[] sortParts = CourseValidate.parseSort(sort);
            String orderBy = sortParts[0];
            String sortBy = sortParts[1];

            return ResponseEntity.ok(responseHandler.createSuccessResponse(courseService.getAllCoursePublic(page, perPage, searchText, minRating, maxRating, startCount, endCount, orderBy, sortBy)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @GetMapping("{id}")
    public ResponseEntity<?> getCourseById(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(responseHandler.createSuccessResponse(courseService.getCourseById(id)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

}
