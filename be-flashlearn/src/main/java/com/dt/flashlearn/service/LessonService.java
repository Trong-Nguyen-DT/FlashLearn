package com.dt.flashlearn.service;

import com.dt.flashlearn.model.request.LessonInput;
import com.dt.flashlearn.model.response.ResponseData;

public interface LessonService {

    ResponseData getAllLessonByCourse(Long courseId);

    ResponseData getLessonById(Long lessonId);

    ResponseData addLesson(LessonInput input);

    ResponseData updateLesson(LessonInput input);

    ResponseData deleteLesson(Long id);
     
}
