package com.dt.flashlearn.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.dt.flashlearn.constant.ErrorConstants;
import com.dt.flashlearn.entity.LearningVocabularyEntity;
import com.dt.flashlearn.entity.LessonEntity;
import com.dt.flashlearn.entity.OtpEntity;
import com.dt.flashlearn.entity.StudentEntity;
import com.dt.flashlearn.entity.VocabularyOfLessonEntity;
import com.dt.flashlearn.entity.Course.CourseEntity;
import com.dt.flashlearn.entity.User.UserEntity;
import com.dt.flashlearn.entity.Vocabulary.VocabularyEntity;
import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.repository.CourseRepository;
import com.dt.flashlearn.repository.LessonRepository;
import com.dt.flashlearn.repository.OtpRepository;
import com.dt.flashlearn.repository.StudentRepository;
import com.dt.flashlearn.repository.UserRepository;
import com.dt.flashlearn.repository.VocabularyOfLessonRepository;
import com.dt.flashlearn.repository.VocabularyRepository;
import com.dt.flashlearn.validate.CourseValidate;

@Service
public class QueryService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private LessonRepository lessonRepository;

    @Autowired
    private VocabularyRepository vocabularyRepository;

    @Autowired
    private VocabularyOfLessonRepository vocabularyOfLessonRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private OtpRepository otpRepository;

    protected boolean checkEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    protected void validateOtp(String email, String otp, String encodeOtp) {
        OtpEntity otpEntity = otpRepository.findByOtp(decodeOtp(encodeOtp));
        if (otpEntity == null) {
            throw new MessageException(ErrorConstants.OTP_NOT_FOUND_MESSAGE, ErrorConstants.OTP_NOT_FOUND_CODE);
        }
        if (!otpEntity.getOtpExpiration().isAfter(LocalDateTime.now())) {
            throw new MessageException(ErrorConstants.OTP_EXPIRED_MESSAGE, ErrorConstants.OTP_EXPIRED_CODE);
        }
        if (!otpEntity.getEmail().equals(email)) {
            throw new MessageException(ErrorConstants.INVALID_DATA_MESSAGE, ErrorConstants.INVALID_DATA_CODE);
        }
        if (!otpEntity.getOtp().equals(otp)) {
            throw new MessageException(ErrorConstants.OTP_INCORRECT_MESSAGE, ErrorConstants.OTP_INCORRECT_CODE);
        }
        otpRepository.delete(otpEntity);
    }

    protected String decodeOtp(String str) {
        // base64 to uf8
        return new String(Base64.getDecoder().decode(str));
    }

    protected String encodeOtp(String str) {
        // utf8 to base64
        return new String(Base64.getEncoder().encode(str.getBytes()));
    }

    protected Authentication getAuthentication() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || authentication.getName().equals("anonymousUser")) {
            throwUnauthorizedException();
        }
        return authentication;
    }

    protected UserEntity getUserEntity() {
        return userRepository.findUserByDeletedFalseAndEmail(getAuthentication().getName()).orElseThrow(
                () -> new MessageException(ErrorConstants.USER_NOT_FOUND_MESSAGE, ErrorConstants.USER_NOT_FOUND_CODE));
    }

    protected void throwUnauthorizedException() {
        throw new MessageException(ErrorConstants.UNAUTHORIZED_MESSAGE, ErrorConstants.UNAUTHORIZED_CODE);
    }

    protected List<CourseEntity> getCourseStudy() {
        UserEntity userEntity = getUserEntity();
        return courseRepository.findAllCourseByStudentAndDeletedFlase(userEntity);
    }

    protected CourseEntity getCourseEntityOnwerById(Long id) {
        return courseRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(
                        () -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
    }

    protected CourseEntity getCourseEntityById(Long id) {
        CourseEntity courseEntity = courseRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(
                        () -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
        CourseValidate.validateCoursePrivate(courseEntity);
        return courseEntity;
    }

    protected StudentEntity getStudentEntityByCourse(CourseEntity courseEntity) {
        return studentRepository.findByUserAndCourseAndDeletedFalse(getUserEntity(), courseEntity);
    }

    protected List<StudentEntity> getAllStudentByCourse(CourseEntity courseEntity) {
        return studentRepository.findByCourseAndDeletedFalse(courseEntity);
    }

    protected LessonEntity getLessonEntityById(Long id) {
        LessonEntity lessonEntity = lessonRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(
                        () -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
        CourseValidate.validateCoursePrivate(lessonEntity.getCourse());
        return lessonEntity;
    }

    protected List<LessonEntity> getAllLessonByCourseId(Long courseId) {
        CourseEntity courseEntity = getCourseEntityById(courseId);
        CourseValidate.validateCoursePrivate(courseEntity);
        return lessonRepository.findAllByCourseAndDeletedFalse(courseEntity, Sort.by(Sort.Direction.ASC, "createAt"));
    }

    protected List<VocabularyOfLessonEntity> getAllVocabularyOfLessonEntityByLessonEntity(LessonEntity lessonEntity) {
        return vocabularyOfLessonRepository.findAllByLessonAndDeletedFalse(lessonEntity, Sort.by(Sort.Direction.ASC, "createAt"));
    }

    protected VocabularyEntity getVocabularyEntityById(Long id) {
        return vocabularyRepository.findVocabularyByIdAndDeletedFalse(id)
                .orElseThrow(
                        () -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
    }

    protected VocabularyOfLessonEntity getVocabularyOfLessonEntityById(Long id) {
        VocabularyOfLessonEntity vocabularyOfLessonEntity = vocabularyOfLessonRepository.findByIdAndDeletedFalse(id)
                .orElseThrow(
                        () -> new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE));
        if (vocabularyOfLessonEntity.getLesson().isDeleted()
                || vocabularyOfLessonEntity.getLesson().getCourse().isDeleted()) {
            throw new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE);
        }
        return vocabularyOfLessonEntity;
    }

    protected List<VocabularyOfLessonEntity> getVocabularyToLearnNew(LessonEntity lessonEntity) {
        StudentEntity studentEntity = getStudentEntityByCourse(lessonEntity.getCourse());
        List<VocabularyOfLessonEntity> vocabularyOfLessonEntities = vocabularyOfLessonRepository
                .findAllByLessonAndDeletedFalse(lessonEntity, Sort.by(Sort.Direction.ASC, "createAt"));
        int startIndex = (int) studentEntity.getLearningVocabularies().stream()
                .filter(learningVocabularyEntity -> learningVocabularyEntity.getVocabularyOfLesson().getLesson().getId()
                        .equals(lessonEntity.getId())
                        && !learningVocabularyEntity.getVocabularyOfLesson().isDeleted())
                .count();
        if (startIndex >= vocabularyOfLessonEntities.size()) {
            throw new MessageException(ErrorConstants.INVALID_DATA_MESSAGE,
                    ErrorConstants.INVALID_DATA_CODE);
        }
        int endIndex = (startIndex + 2) > vocabularyOfLessonEntities.size() ? vocabularyOfLessonEntities.size()
                : startIndex + 2;
        return vocabularyOfLessonEntities.subList(startIndex, endIndex);
    }

    protected List<LearningVocabularyEntity> getLearningVocabularyEntityByStudent(CourseEntity courseEntity, int count) {
        LocalDate today = LocalDate.now();
        StudentEntity studentEntity = getStudentEntityByCourse(courseEntity);
        List<LearningVocabularyEntity> learningVocabularies = getVocabularyPractice(studentEntity, null);
        if (learningVocabularies == null || learningVocabularies.isEmpty()) {
            return new ArrayList<>();
        }
        List<LearningVocabularyEntity> filteredVocabularies = learningVocabularies.stream()
                .filter(vocabulary -> !vocabulary.getNextReview().isAfter(today))
                .sorted(Comparator.comparing(LearningVocabularyEntity::getNextReview))
                .collect(Collectors.toList());

        if (filteredVocabularies.size() < count) {
            List<LearningVocabularyEntity> newVocabularies = learningVocabularies.stream()
                    .filter(vocabulary -> vocabulary.getNextReview().isAfter(today))
                    .sorted(Comparator.comparing(LearningVocabularyEntity::getNextReview))
                    .collect(Collectors.toList());

            int remainingCount = count - filteredVocabularies.size();
            if (newVocabularies.size() > remainingCount) {
                filteredVocabularies.addAll(newVocabularies.subList(0, remainingCount));
            } else {
                filteredVocabularies.addAll(newVocabularies);
            }
        }
        return filteredVocabularies;
    }

    protected List<LearningVocabularyEntity> getLearningVocabularyEntityByLesson(LessonEntity lessonEntity, int count) {
        LocalDate today = LocalDate.now();
        StudentEntity studentEntity = getStudentEntityByCourse(lessonEntity.getCourse());
        List<LearningVocabularyEntity> learningVocabularies = getVocabularyPractice(studentEntity, lessonEntity);
        if (learningVocabularies == null || learningVocabularies.isEmpty()) {
            return new ArrayList<>();
        }
        List<LearningVocabularyEntity> filteredVocabularies = learningVocabularies.stream()
                .filter(vocabulary -> !vocabulary.getNextReview().isAfter(today))
                .sorted(Comparator.comparing(LearningVocabularyEntity::getNextReview))
                .collect(Collectors.toList());

        if (filteredVocabularies.size() < count) {
            List<LearningVocabularyEntity> newVocabularies = learningVocabularies.stream()
                    .filter(vocabulary -> vocabulary.getNextReview().isAfter(today))
                    .sorted(Comparator.comparing(LearningVocabularyEntity::getNextReview))
                    .collect(Collectors.toList());

            int remainingCount = count - filteredVocabularies.size();
            if (newVocabularies.size() > remainingCount) {
                filteredVocabularies.addAll(newVocabularies.subList(0, remainingCount));
            } else {
                filteredVocabularies.addAll(newVocabularies);
            }
        }
        return filteredVocabularies;
    }

    private List<LearningVocabularyEntity> getVocabularyPractice(StudentEntity studentEntity,
            LessonEntity lessonEntity) {
        if (lessonEntity == null) {
            return studentEntity.getLearningVocabularies().stream()
                    .filter(vocabulary -> !vocabulary.getVocabularyOfLesson().isDeleted()).toList();
        }

        return studentEntity.getLearningVocabularies().stream()
                .filter(vocabulary -> !vocabulary.getVocabularyOfLesson().isDeleted()
                        && vocabulary.getVocabularyOfLesson().getLesson().getId().equals(lessonEntity.getId()))
                .toList();
    }

    public LearningVocabularyEntity getLearningVocabularyEntityByStudentAndVocabularyOfLesson(
            StudentEntity studentEntity,
            VocabularyOfLessonEntity vocabularyOfLessonEntity) {
        return studentEntity.getLearningVocabularies().stream()
                .filter(vocabulary -> vocabulary.getVocabularyOfLesson().getId()
                        .equals(vocabularyOfLessonEntity.getId()) && !vocabularyOfLessonEntity.getLesson().isDeleted())
                .findFirst()
                .orElse(null);
    }

}
