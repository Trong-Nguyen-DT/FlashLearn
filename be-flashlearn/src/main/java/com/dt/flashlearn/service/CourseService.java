package com.dt.flashlearn.service;

import com.dt.flashlearn.model.response.ResponseData;

public interface CourseService {

    ResponseData getAllCourse(int page, int perPage,
                                    String searchText,
                                    int rating,
                                    int startCount, int endCount,
                                    String status,
                                    String orderBy, String sortBy);
    
}
