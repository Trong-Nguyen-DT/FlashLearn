package com.dt.flashlearn.controller.User;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.request.AddStudentInput;
import com.dt.flashlearn.model.response.ResponseError;
import com.dt.flashlearn.service.StudentService;
import com.dt.flashlearn.service.component.ResponseHandler;
import com.dt.flashlearn.validate.ValidateData;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("api/user/student")
public class StudentController {

    @Autowired
    private StudentService studentService;
    
    @Autowired
    private ResponseHandler responseHandler;
    
    @GetMapping()
    public ResponseEntity<?> getAllStudentByCourse(@RequestParam(required = true) Long courseId) {
        try {
            return ResponseEntity.ok(responseHandler.createSuccessResponse(studentService.getAllStudentByCourse(courseId)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @GetMapping("rank/{courseId}")
    public ResponseEntity<?> getRankByCourse(@PathVariable Long courseId, @RequestParam(required = false, defaultValue = "day") String period) {
        try {
            return ResponseEntity.ok(responseHandler.createSuccessResponse(studentService.getRankByCourse(courseId, ValidateData.validateOrderBy(period))));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @PostMapping()
    public ResponseEntity<?> addStudent(@RequestBody AddStudentInput input) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(responseHandler.createCreatedResponse(studentService.addStudent(input)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @PutMapping("{courseId}")
    public ResponseEntity<?> joinCourse(@PathVariable Long courseId) {
        try {
            return ResponseEntity.ok(responseHandler.createSuccessResponse(studentService.joinCourse(courseId)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @PutMapping()
    public ResponseEntity<?> joinCourseByCode(@RequestParam(required = true) String code) {
        try {
            return ResponseEntity.ok(responseHandler.createSuccessResponse(studentService.joinCourseByCode(ValidateData.validateCode(code))));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @PatchMapping("{courseId}")
    public ResponseEntity<?> leaveCourse(@PathVariable Long courseId) {
        try {
            return ResponseEntity.ok(responseHandler.createSuccessResponse(studentService.leaveCourse(courseId)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @DeleteMapping("{courseId}/{studentId}")
    public ResponseEntity<?> removeStudent(@PathVariable Long courseId, @PathVariable Long studentId) {
        try {
            return ResponseEntity.ok(responseHandler.createSuccessResponse(studentService.removeStudent(courseId, studentId)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseError handleValidationExceptions(MethodArgumentNotValidException ex) {
        return responseHandler.handleValidationExceptions(ex);
    }
    
}
