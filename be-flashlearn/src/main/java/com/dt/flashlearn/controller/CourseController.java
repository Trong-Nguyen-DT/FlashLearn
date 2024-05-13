package com.dt.flashlearn.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dt.flashlearn.constant.ErrorConstants;
import com.dt.flashlearn.constant.OrderByConstants;
import com.dt.flashlearn.constant.SuccessConstants;
import com.dt.flashlearn.entity.Course.CourseStatus;
import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.response.ResponseBody;
import com.dt.flashlearn.model.response.ResponseError;
import com.dt.flashlearn.service.CourseService;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseStatus;

@RestController
@RequestMapping("api/course")
public class CourseController {

    @Autowired
    private CourseService courseService;

    @GetMapping()
    public ResponseEntity<?> getAllCoursePublic(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "10") int perPage,
            @RequestParam(defaultValue = "") String searchText,
            @RequestParam(defaultValue = "0") int rating,
            @RequestParam(defaultValue = "0:9999999") String wordCount,
            @RequestParam(defaultValue = "createAt:desc") String sort) {
        try {
            int[] wordCountParts = parseWordCount(wordCount);
            int startCount = wordCountParts[0];
            int endCount = wordCountParts[1];

            String[] sortParts = parseSort(sort);
            String orderBy = sortParts[0];
            String sortBy = sortParts[1];

            ResponseBody body = new ResponseBody();
            body.setCode(SuccessConstants.OK_CODE);
            body.setMessage(Arrays.asList(SuccessConstants.OK_MESSAGE));
            body.setData(courseService.getAllCourse(page, perPage, searchText, rating, startCount, endCount, CourseStatus.PUBLIC.name(), orderBy, sortBy));
            return ResponseEntity.ok(body);
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(createErrorResponse(e));
        }
    }

    private int[] parseWordCount(String wordCount) {
        String[] wordCountParts = wordCount.split(":");
        int startCount = 0;
        int endCount = 99999999;
        try {
            if (wordCountParts.length == 2) {
                startCount = Integer.parseInt(wordCountParts[0]);
                endCount = Integer.parseInt(wordCountParts[1]);
            }
        } catch (NumberFormatException e) {
            throw new MessageException(ErrorConstants.INVALID_DATA_MESSAGE, ErrorConstants.INVALID_DATA_CODE);
        }
        return new int[] { startCount, endCount };
    }

    private String[] parseSort(String sort) {
        String[] sortParts = sort.split(":");
        String orderBy = "createAt";
        String sortBy = "desc";
        if (sortParts.length == 2) {
            orderBy = sortParts[0];
            sortBy = sortParts[1];
        }
        if ((!orderBy.equals(OrderByConstants.ORDER_BY_CREATE_AT)
                && !orderBy.equals(OrderByConstants.ORDER_BY_RATING)
                && !orderBy.equals(OrderByConstants.ORDER_BY_WORD_COUNT)
                && !orderBy.equals(OrderByConstants.ORDER_BY_NAME))){
            throw new MessageException(ErrorConstants.INVALID_DATA_MESSAGE, ErrorConstants.INVALID_DATA_CODE);
        }
        if (!sortBy.equals(OrderByConstants.SORT_BY_DESC) && !sortBy.equals(OrderByConstants.SORT_BY_ASC)) {
            throw new MessageException(ErrorConstants.INVALID_DATA_MESSAGE, ErrorConstants.INVALID_DATA_CODE);
        }
        return new String[] { orderBy, sortBy };
    }

    private ResponseError createErrorResponse(MessageException e) {
        ResponseError response = new ResponseError();
        response.setCode(e.getErrorCode());
        response.setMessage(Arrays.asList(e));
        return response;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseError handleValidationExceptions(MethodArgumentNotValidException ex) {
        ResponseError response = new ResponseError();
        response.setCode(ErrorConstants.INVALID_CREDENTIALS_CODE);
        List<Object> messages = new ArrayList<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            messages.add(new MessageException(fieldName + ": " + error.getDefaultMessage(), response.getCode()));
        });
        response.setMessage(messages);
        return response;
    }

}
