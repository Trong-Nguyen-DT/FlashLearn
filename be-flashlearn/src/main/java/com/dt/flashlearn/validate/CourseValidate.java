package com.dt.flashlearn.validate;

import org.springframework.security.core.context.SecurityContextHolder;

import com.dt.flashlearn.constant.ErrorConstants;
import com.dt.flashlearn.entity.Course.CourseEntity;
import com.dt.flashlearn.entity.Course.CourseStatus;
import com.dt.flashlearn.exception.MessageException;

public class CourseValidate {
    
    public static void validateCoursePrivate(CourseEntity entity) {
        if (entity.getStatus().equals(CourseStatus.PRIVATE.name())) {
            String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
            boolean isOwner = entity.getOwner().getEmail().equals(currentUserEmail);
            boolean isStudent = entity.getStudents().stream()
                    .anyMatch(student -> student.getUser().getEmail().equals(currentUserEmail));
            if (!isOwner && !isStudent) {
                throw new MessageException(ErrorConstants.UNAUTHORIZED_MESSAGE, ErrorConstants.UNAUTHORIZED_CODE);
            }
        }
    }
}
