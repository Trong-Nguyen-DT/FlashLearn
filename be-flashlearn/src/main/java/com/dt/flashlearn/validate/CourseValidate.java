package com.dt.flashlearn.validate;

import java.util.Map;

import org.springframework.security.core.context.SecurityContextHolder;

import com.dt.flashlearn.constant.ErrorConstants;
import com.dt.flashlearn.constant.OrderByConstants;
import com.dt.flashlearn.entity.Course.CourseEntity;
import com.dt.flashlearn.entity.Course.CourseStatus;
import com.dt.flashlearn.exception.MessageException;

public class CourseValidate {

    public static void validateCoursePrivate(CourseEntity entity) {
        if (entity.isDeleted()) {
            throw new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE);
        }
        if (entity.getStatus().equals(CourseStatus.PRIVATE)) {
            String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
            boolean isOwner = entity.getOwner().getEmail().equals(currentUserEmail);
            boolean isStudent = entity.getStudents().stream()
                    .anyMatch(student -> student.getUser().getEmail().equals(currentUserEmail));
            if (!isOwner && !isStudent) {
                throw new MessageException(ErrorConstants.UNAUTHORIZED_MESSAGE, ErrorConstants.UNAUTHORIZED_CODE);
            }
        }
    }

    public static void validateCourseOwner(CourseEntity entity) {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        if (!entity.getOwner().getEmail().equals(currentUserEmail)) {
            throw new MessageException(ErrorConstants.UNAUTHORIZED_MESSAGE, ErrorConstants.UNAUTHORIZED_CODE);
        }
    }

    public static void validateExistStudent(CourseEntity entity) {
        String currentUserEmail = SecurityContextHolder.getContext().getAuthentication().getName();
        boolean isStudent = entity.getStudents().stream()
                .anyMatch(student -> student.getUser().getEmail().equals(currentUserEmail));
        if (!isStudent) {
            throw new MessageException(ErrorConstants.UNAUTHORIZED_MESSAGE, ErrorConstants.UNAUTHORIZED_CODE);
        }
    }

    public static CourseStatus parseStatus(String status) {
        if (status.equals("null")) {
            return null;
        }
        if (status.equals(CourseStatus.PUBLIC.name())) {
            return CourseStatus.PUBLIC;
        }
        if (status.equals(CourseStatus.PRIVATE.name())) {
            return CourseStatus.PRIVATE;
        }
        throw new MessageException(ErrorConstants.INVALID_DATA_MESSAGE, ErrorConstants.INVALID_DATA_CODE);
    }

    public static int[] parseWordCount(String wordCount) {
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

    public static String[] parseSort(String sort) {
        String orderBy = "createAt";
        String sortBy = "desc";

        String[] sortParts = sort.split(":");
        if (sortParts.length == 2) {
            orderBy = sortParts[0];
            sortBy = sortParts[1];
        }

        Map<String, String> orderByMap = Map.of(
            OrderByConstants.ORDER_BY_CREATE_AT, "createAt",
            OrderByConstants.ORDER_BY_RATING, "avgRating",
            OrderByConstants.ORDER_BY_WORD_COUNT, "totalVocal",
            OrderByConstants.ORDER_BY_NAME, "name"
        );
        if (!orderByMap.containsKey(orderBy)) {
            throw new MessageException(ErrorConstants.INVALID_DATA_MESSAGE, ErrorConstants.INVALID_DATA_CODE);
        }
        if (!sortBy.equalsIgnoreCase(OrderByConstants.SORT_BY_DESC) && !sortBy.equalsIgnoreCase(OrderByConstants.SORT_BY_ASC)) {
            throw new MessageException(ErrorConstants.INVALID_DATA_MESSAGE, ErrorConstants.INVALID_DATA_CODE);
        }
        sortBy = sortBy.toLowerCase();
        return new String[] { orderByMap.get(orderBy), sortBy };
    }
}
