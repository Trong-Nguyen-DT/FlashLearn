package com.dt.flashlearn.service;

import com.dt.flashlearn.entity.Course.CourseStatus;
import com.dt.flashlearn.model.request.CourseInput;
import com.dt.flashlearn.model.request.RatingCourseInput;
import com.dt.flashlearn.model.response.ResponseData;

public interface CourseService {

    ResponseData getAllCoursePublic(int page, int perPage,
            String searchText,
            int minRating, int maxRating,
            int startCount, int endCount,
            String orderBy, String sortBy);

    ResponseData getAllMyCourse(int page, int perPage,
            String searchText,
            int minRating, int maxRating,
            int startCount, int endCount,
            CourseStatus status,
            String orderBy, String sortBy);

    ResponseData getAllMyCourseStudy();

    ResponseData createCourse(CourseInput input);

    ResponseData updateCourse(CourseInput input);

    ResponseData deleteCourse(Long id);

    ResponseData getCourseById(Long id);

    ResponseData ratingCourse(RatingCourseInput input);

}
