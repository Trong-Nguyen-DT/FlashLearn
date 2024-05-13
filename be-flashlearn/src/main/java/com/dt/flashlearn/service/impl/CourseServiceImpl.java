package com.dt.flashlearn.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import com.dt.flashlearn.constant.OrderByConstants;
import com.dt.flashlearn.converter.CourseConverter;
import com.dt.flashlearn.entity.Course.CourseEntity;
import com.dt.flashlearn.model.response.ResponseData;
import com.dt.flashlearn.model.response.ResponsePage;
import com.dt.flashlearn.repository.CourseRepository;
import com.dt.flashlearn.service.CourseService;

@Service
public class CourseServiceImpl implements CourseService {

    @Autowired
    private CourseRepository courseRepository;

    @Override
    public ResponseData getAllCourse(int page, int perPage,
                                            String searchText,
                                            int rating,
                                            int startCount, int endCount,
                                            String status,
                                            String orderBy, String sortBy) {
        Page<CourseEntity> courses;
        if (OrderByConstants.SORT_BY_DESC.equalsIgnoreCase(sortBy.toUpperCase())) {
            courses = courseRepository.findAllCourseDesc(searchText, rating, startCount, endCount, status, orderBy,
                    PageRequest.of(page - 1, perPage));
        } else {
            courses = courseRepository.findAllCourseAsc(searchText, rating, startCount, endCount, status, orderBy,
                    PageRequest.of(page - 1, perPage));
        }
        return new ResponseData(
                CourseConverter.convertToObjects(courses.getContent().stream().map(CourseConverter::toModel).toList()),
                new ResponsePage(courses.getNumber() + 1, courses.getSize(), courses.getTotalElements(),
                        courses.getTotalPages()));

    }
}
