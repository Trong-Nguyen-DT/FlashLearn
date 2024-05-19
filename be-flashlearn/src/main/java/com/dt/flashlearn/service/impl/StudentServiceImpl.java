package com.dt.flashlearn.service.impl;

import java.time.LocalDateTime;
import java.util.concurrent.atomic.AtomicLong;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
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
import com.dt.flashlearn.validate.CourseValidate;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Override
    public ResponseData getAllStudentByCourse(Long courseId) {
        CourseEntity courseEntity = courseRepository.findByIdAndDeletedFalse(courseId)
                .orElseThrow(
                        () -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));

        CourseValidate.validateCoursePrivate(courseEntity);
        return createResponseData(courseEntity);
    }

    @Override
    public ResponseData addStudent(AddStudentInput input) {
        CourseEntity courseEntity = getCourseEntityById(input.getCourseId());
        for (String email : input.getEmailStudents()) {
            courseEntity.getStudents().stream().filter(student -> student.getUser().getEmail().equals(email))
                    .findFirst().ifPresentOrElse(
                            student -> {
                                if (student.getDeleted().equals(true)) {
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
        courseEntity.setTotalStudent(calculatorStudent(courseEntity));
        courseRepository.save(courseEntity);
        return createResponseData(courseEntity);
    }

    @Override
    public ResponseData joinCourse(Long courseId) {
        UserEntity userEntity = getUserEntity();
        CourseEntity courseEntity = courseRepository
                .findByIdAndStatusAndDeletedFalse(courseId, CourseStatus.PUBLIC.name())
                .orElseThrow(
                        () -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));

        courseEntity.getStudents().stream().filter(student -> student.getUser().getId().equals(userEntity.getId()))
                .findFirst().ifPresentOrElse(
                        student -> {
                            if (student.getDeleted().equals(true)) {
                                student.setDeleted(false);
                                studentRepository.save(student);
                            }
                        },
                        () -> courseEntity.getStudents().add(createStudent(userEntity, courseEntity)));
        courseEntity.setTotalStudent(calculatorStudent(courseEntity));
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
        CourseEntity courseEntity = getCourseEntityById(courseId);
        StudentEntity studentEntity = courseEntity.getStudents().stream()
                .filter(student -> student.getId().equals(studentId) && student.getDeleted().equals(false)).findFirst()
                .orElseThrow(
                        () -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
        studentEntity.setDeleted(true);
        courseEntity.setTotalStudent(calculatorStudent(courseEntity));
        courseRepository.save(courseEntity);
        return createResponseData(courseEntity);
    }

    @Override
    public ResponseData leaveCourse(Long courseId) {
        CourseEntity courseEntity = courseRepository.findByIdAndDeletedFalse(courseId)
                .orElseThrow(
                        () -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
        UserEntity userEntity = getUserEntity();
        courseEntity.getStudents().stream().filter(student -> student.getUser().getId().equals(userEntity.getId()))
                .findFirst().ifPresent(student -> {
                    student.setDeleted(true);
                    courseEntity.setTotalStudent(calculatorStudent(courseEntity));
                    courseRepository.save(courseEntity);
                });
        return createResponseData(courseEntity);

    }

    private Long calculatorStudent(CourseEntity courseEntity) {
        AtomicLong totalStudent = new AtomicLong();
        courseEntity.getStudents().stream().filter(student -> student.getDeleted().equals(false))
                .forEach(student -> totalStudent.getAndIncrement());
        return totalStudent.get();
    }

    private CourseEntity getCourseEntityById(Long id) {
        return getUserEntity()
                .getCourses()
                .stream()
                .filter(course -> course.getId().equals(id) && course.getDeleted().equals(false))
                .findFirst()
                .orElseThrow(
                        () -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
    }

    private UserEntity getUserEntity() {
        return userRepository.findUserByDeletedFalseAndEmail(getAuthentication().getName()).orElseThrow(
                () -> new MessageException(ErrorConstants.USER_NOT_FOUND_MESSAGE, ErrorConstants.USER_NOT_FOUND_CODE));
    }

    private Authentication getAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName().equals("anonymousUser")) {
            throwUnauthorizedException();
        }
        return authentication;
    }

    private void throwUnauthorizedException() {
        throw new MessageException(ErrorConstants.UNAUTHORIZED_MESSAGE, ErrorConstants.UNAUTHORIZED_CODE);
    }

    private ResponseData createResponseData(CourseEntity courseEntity) {
        return new ResponseData(StudentConverter
        .convertToObjects(courseEntity.getStudents().stream().filter(student -> student.getDeleted().equals(false))
                .map(StudentConverter::toModel).toList()));
    }

}
