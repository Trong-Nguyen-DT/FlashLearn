package com.dt.flashlearn.service;

import com.dt.flashlearn.model.request.AddStudentInput;
import com.dt.flashlearn.model.response.ResponseData;

public interface StudentService {

    ResponseData getAllStudentByCourse(Long courseId);

    ResponseData addStudent(AddStudentInput input);

    ResponseData joinCourse(Long courseId);

    ResponseData joinCourseByCode(String validateCode);

    ResponseData removeStudent(Long courseId, Long studentId);

    ResponseData leaveCourse(Long courseId);

    ResponseData getRankByCourse(Long courseId, String orderBy);

    
    
}
