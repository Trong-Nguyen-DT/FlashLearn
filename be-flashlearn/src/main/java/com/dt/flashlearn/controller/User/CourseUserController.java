package com.dt.flashlearn.controller.User;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.request.CourseInput;
import com.dt.flashlearn.model.request.RatingCourseInput;
import com.dt.flashlearn.model.response.ResponseError;
import com.dt.flashlearn.service.CourseService;
import com.dt.flashlearn.service.component.ResponseHandler;
import com.dt.flashlearn.validate.CourseValidate;
import com.dt.flashlearn.validate.ValidateData;

import jakarta.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PathVariable;




@RestController
@RequestMapping("api/user/course")
public class CourseUserController {

    @Autowired
    private CourseService courseService;

    @Autowired
    private ResponseHandler responseHandler;
    
    @GetMapping()
    public ResponseEntity<?> getAllMyCourse(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int perPage,
            @RequestParam(defaultValue = "") String searchText,
            @RequestParam(defaultValue = "0") int rating,
            @RequestParam(defaultValue = "null") String status,
            @RequestParam(defaultValue = "0:9999999") String wordCount,
            @RequestParam(defaultValue = "createAt:desc") String sort) {
        try {
            int[] wordCountParts = CourseValidate.parseWordCount(wordCount);
            int startCount = wordCountParts[0];
            int endCount = wordCountParts[1];

            String[] sortParts = CourseValidate.parseSort(sort);
            String orderBy = sortParts[0];
            String sortBy = sortParts[1];

            status = CourseValidate.parseStatus(status);

            return ResponseEntity.ok(responseHandler.createSuccessResponse(courseService.getAllMyCourse(page, perPage, searchText, rating, startCount, endCount, status, orderBy, sortBy)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @GetMapping("/study")
    public ResponseEntity<?> getAllMyCourseStudy() {
        try {
            return ResponseEntity.ok(responseHandler.createSuccessResponse(courseService.getAllMyCourseStudy()));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @PostMapping()
    public ResponseEntity<?> createCourse(@Valid CourseInput input) {
        try {
            input.setStatus(CourseValidate.parseStatus(input.getStatus()));
            return ResponseEntity.status(HttpStatus.CREATED).body(responseHandler.createCreatedResponse(courseService.createCourse(input)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @PutMapping()
    public ResponseEntity<?> updateCourse(@Valid CourseInput input) {
        try {
            ValidateData.validateNotNull(input.getId());
            input.setStatus(CourseValidate.parseStatus(input.getStatus()));
            return ResponseEntity.ok(responseHandler.createSuccessResponse(courseService.updateCourse(input)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @PatchMapping()
    public ResponseEntity<?> ratingCourse(@Valid @RequestBody RatingCourseInput input) {
        try {
            return ResponseEntity.ok(responseHandler.createSuccessResponse(courseService.ratingCourse(input)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCourse(@PathVariable Long id) {
        try {
            return ResponseEntity.ok(responseHandler.createSuccessResponse(courseService.deleteCourse(id)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseError handleValidationExceptions(MethodArgumentNotValidException ex) {
        return responseHandler.handleValidationExceptions(ex);
    }
}
