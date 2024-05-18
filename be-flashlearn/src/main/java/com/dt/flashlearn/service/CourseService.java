package com.dt.flashlearn.service;

import com.dt.flashlearn.model.request.CourseInput;
import com.dt.flashlearn.model.response.ResponseData;

import jakarta.validation.Valid;

public interface CourseService {

    ResponseData getAllCoursePublic(int page, int perPage,
                                    String searchText,
                                    int rating,
                                    int startCount, int endCount,
                                    String orderBy, String sortBy);

    ResponseData getAllMyCourse(int page, int perPage,
                                String searchText,
                                int rating,
                                int startCount, int endCount,
                                String status,
                                String orderBy, String sortBy);

    ResponseData createCourse(CourseInput input);

    ResponseData updateCourse(CourseInput input);

    ResponseData deleteCourse(Long id);

    ResponseData getCourseById(Long id);
    
}
