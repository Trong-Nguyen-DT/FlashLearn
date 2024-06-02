package com.dt.flashlearn.service.impl;

import java.time.LocalDateTime;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dt.flashlearn.constant.ErrorConstants;
import com.dt.flashlearn.converter.CourseConverter;
import com.dt.flashlearn.converter.StudentConverter;
import com.dt.flashlearn.entity.StudentEntity;
import com.dt.flashlearn.entity.Course.CourseEntity;
import com.dt.flashlearn.entity.Course.CourseStatus;
import com.dt.flashlearn.entity.User.UserEntity;
import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.request.AddStudentInput;
import com.dt.flashlearn.model.response.ResponseData;
import com.dt.flashlearn.repository.CourseRepository;
import com.dt.flashlearn.repository.StudentRepository;
import com.dt.flashlearn.repository.UserRepository;
import com.dt.flashlearn.service.StudentService;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private QueryService queryService;

    @Override
    public ResponseData getAllStudentByCourse(Long courseId) {
        CourseEntity courseEntity = queryService.getCourseEntityById(courseId);
        return createResponseData(courseEntity);
    }

    @Override
    public ResponseData addStudent(AddStudentInput input) {
        CourseEntity courseEntity = queryService.getCourseEntityOnwerById(input.getCourseId());
        for (String email : input.getEmailStudents()) {
            courseEntity.getStudents().stream().filter(student -> student.getUser().getEmail().equals(email))
                    .findFirst().ifPresentOrElse(
                            student -> {
                                if (student.isDeleted()) {
                                    student.setDeleted(false);
                                    studentRepository.save(student);
                                }
                            },
                            () -> {
                                UserEntity userEntity = userRepository.findUserByDeletedFalseAndEmail(email)
                                        .orElseThrow(() -> new MessageException(ErrorConstants.USER_NOT_FOUND_MESSAGE,
                                                ErrorConstants.USER_NOT_FOUND_CODE));
                                courseEntity.getStudents().add(createStudent(userEntity, courseEntity));
                            });
        }
        courseRepository.save(courseEntity);
        return createResponseData(courseEntity);
    }

    @Override
    public ResponseData joinCourse(Long courseId) {
        UserEntity userEntity = queryService.getUserEntity();
        CourseEntity courseEntity = courseRepository
                .findByIdAndStatusAndDeletedFalse(courseId, CourseStatus.PUBLIC)
                .orElseThrow(
                        () -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));

        courseEntity.getStudents().stream().filter(student -> student.getUser().getId().equals(userEntity.getId()))
                .findFirst().ifPresentOrElse(
                        student -> {
                            if (student.isDeleted()) {
                                student.setDeleted(false);
                                studentRepository.save(student);
                            }
                        },
                        () -> courseEntity.getStudents().add(createStudent(userEntity, courseEntity)));
        return new ResponseData(CourseConverter.toModel(courseRepository.save(courseEntity)));
    }

    @Override
    public ResponseData joinCourseByCode(String code) {
        UserEntity userEntity = queryService.getUserEntity();
        CourseEntity courseEntity = courseRepository.findByCodeAndDeletedFalse(code)
                .orElseThrow(
                        () -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));

        courseEntity.getStudents().stream().filter(student -> student.getUser().getId().equals(userEntity.getId()))
                .findFirst().ifPresentOrElse(
                        student -> {
                            if (student.isDeleted()) {
                                student.setDeleted(false);
                                studentRepository.save(student);
                            }
                        },
                        () -> courseEntity.getStudents().add(createStudent(userEntity, courseEntity)));
        return new ResponseData(CourseConverter.toModel(courseRepository.save(courseEntity)));
    }

    private StudentEntity createStudent(UserEntity userEntity, CourseEntity courseEntity) {
        LocalDateTime now = LocalDateTime.now();
        StudentEntity studentEntity = new StudentEntity();
        studentEntity.setUser(userEntity);
        studentEntity.setCourse(courseEntity);
        studentEntity.setCreateAt(now);
        studentEntity.setUpdateAt(now);
        studentEntity.setRating(0);
        studentEntity.setDeleted(false);
        return studentRepository.save(studentEntity);
    }

    @Override
    public ResponseData removeStudent(Long courseId, Long studentId) {
        CourseEntity courseEntity = queryService.getCourseEntityOnwerById(courseId);
        StudentEntity studentEntity = queryService.getStudentEntityByCourse(courseEntity);
        studentEntity.setDeleted(true);
        courseRepository.save(courseEntity);
        return createResponseData(courseEntity);
    }

    @Override
    public ResponseData leaveCourse(Long courseId) {
        CourseEntity courseEntity = courseRepository.findByIdAndDeletedFalse(courseId)
                .orElseThrow(
                        () -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
        UserEntity userEntity = queryService.getUserEntity();
        courseEntity.getStudents().stream().filter(student -> student.getUser().getId().equals(userEntity.getId()))
                .findFirst().ifPresent(student -> {
                    student.setDeleted(true);
                    courseRepository.save(courseEntity);
                });
        return createResponseData(courseEntity);

    }

    private ResponseData createResponseData(CourseEntity courseEntity) {
        return new ResponseData(queryService.getAllStudentByCourse(courseEntity).stream().map(StudentConverter::toModel)
                .toList());
    }

}
