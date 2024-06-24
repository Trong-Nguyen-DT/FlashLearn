package com.dt.flashlearn.service.impl;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.Locale;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.dt.flashlearn.constant.ErrorConstants;
import com.dt.flashlearn.converter.CourseConverter;
import com.dt.flashlearn.converter.StudentConverter;
import com.dt.flashlearn.entity.StudentEntity;
import com.dt.flashlearn.entity.Course.CourseEntity;
import com.dt.flashlearn.entity.Course.CourseStatus;
import com.dt.flashlearn.entity.User.UserEntity;
import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.Student;
import com.dt.flashlearn.model.request.AddStudentInput;
import com.dt.flashlearn.model.request.StudentInput;
import com.dt.flashlearn.model.response.ResponseData;
import com.dt.flashlearn.repository.CourseRepository;
import com.dt.flashlearn.repository.StudentRepository;
import com.dt.flashlearn.repository.UserRepository;
import com.dt.flashlearn.service.StudentService;
import com.dt.flashlearn.service.component.MailService;
import com.dt.flashlearn.validate.CourseValidate;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired
    private CourseRepository courseRepository;

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private QueryService queryService;

    @Autowired
    private MailService mailService;

    @Value("${client.url}")
    private String client;
    

    private final String websiteName = "FlashLearn";

    @Override
    public ResponseData getAllStudentByCourse(Long courseId) {
        CourseEntity courseEntity = queryService.getCourseEntityById(courseId);
        return createResponseData(courseEntity);
    }

    @Override
    public ResponseData addStudent(StudentInput input) {
        CourseEntity courseEntity = queryService.getCourseEntityOwnerById(input.getCourseId());
        UserEntity userEntity = queryService.getUserEntity();
        if (!userEntity.getEmail().equals(input.getEmail())) {
            throw new MessageException(ErrorConstants.NOT_FOUND_MESSAGE, ErrorConstants.NOT_FOUND_CODE);
        }
        StudentEntity studentEntity = courseEntity.getStudents().stream()
                    .filter(student -> student.getUser().getEmail().equals(input.getEmail())).findFirst().orElse(null);
            if (studentEntity == null) {
                courseEntity.getStudents().add(createStudent(userEntity, courseEntity));
            } else {
                if (studentEntity.isDeleted()) {
                    studentEntity.setDeleted(false);
                    studentRepository.save(studentEntity);
                }
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
        CourseEntity courseEntity = queryService.getCourseEntityOwnerById(courseId);
        StudentEntity studentEntity = queryService.getStudentEntityByCourseAndStudentId(courseEntity, studentId);
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

    @Override
    public ResponseData getRankByCourse(Long courseId, String orderBy){
        CourseEntity courseEntity = queryService.getCourseEntityById(courseId);
        LocalDate date = getConditionDate(orderBy);
        return new ResponseData(getStudentByRank(queryService.getAllStudentByCourse(courseEntity), date));
    }

    private List<Student> getStudentByRank(List<StudentEntity> studentEntities, LocalDate date) {
        List<Student> students = new ArrayList<>();
        for (StudentEntity studentEntity : studentEntities) {
            Student student = StudentConverter.toModel(studentEntity);
            student.setExperience(studentEntity.calculateExperienceByTime(date));
            students.add(student);
        }
        Collections.sort(students, Comparator.comparingLong(Student::getExperience).reversed());
        return students;
    }

    private LocalDate getConditionDate(String orderBy) {
        LocalDate date = LocalDate.now();
        switch (orderBy) {
            case "day":
                return date.minusDays(1);
            case "week":
                return date.minusWeeks(1);
            case "month":
                return date.minusMonths(1);
            case "total":
                return null;
            default:
                return date;
        }
    }

    @Override
    public ResponseData sendMailStudent(AddStudentInput input) {
        CourseEntity courseEntity = queryService.getCourseEntityOwnerById(input.getCourseId());
        CourseValidate.validateCourseOwner(courseEntity);
        UserEntity owner = queryService.getUserEntity();
        List<String> emailErrors = new ArrayList<>();
        for (String email : input.getEmailStudents()) {
            StudentEntity studentEntity = courseEntity.getStudents().stream()
                    .filter(student -> student.getUser().getEmail().equals(email)).findFirst().orElse(null);
            if (studentEntity == null || studentEntity.isDeleted()) {
                String message = getMessageSendEmail(email, courseEntity, owner, studentEntity);
                mailService.sendEmail(email, message, "Thư mời tham gia khóa học");
            } else {
                emailErrors.add("Học viên " + email + " đã tham gia khóa học");
            } 
        }
        return new ResponseData(emailErrors);
    }

    private String getMessageSendEmail(String email, CourseEntity courseEntity, UserEntity onwer, StudentEntity studentEntity) {
        LocalDate dateNow = LocalDate.now();
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd 'tháng' MM 'năm' yyyy", new Locale("vi", "VN"));
        String formattedDate = dateNow.format(formatter);
        UserEntity userEntity = userRepository.findUserByDeletedFalseAndEmail(email).orElse(null);
        String clientUrl = client + "/join-course/?hasExist=true&email=" + email + "&courseId=" + courseEntity.getId();
        if (studentEntity != null) {
            return "<!DOCTYPE html>" +
            "<html lang=\"en\">" +
            "<head>" +
            "    <meta charset=\"UTF-8\" />" +
            "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />" +
            "    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\" />" +
            "    <title>Static Template</title>" +
            "    <link href=\"https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap\" rel=\"stylesheet\" />" +
            "</head>" +
            "<body style=\"" +
            "      margin: 0;" +
            "      font-family: 'Poppins', sans-serif;" +
            "      background: #ffffff;" +
            "      font-size: 14px;" +
            "    \">" +
            "    <div style=\"" +
            "        max-width: 680px;" +
            "        margin: 0 auto;" +
            "        padding: 45px 30px 60px;" +
            "        background: #f4f7ff;" +
            "        background-image: url(https://img.freepik.com/free-vector/gradient-smooth-background_23-2148974923.jpg);" +
            "        background-repeat: no-repeat;" +
            "        background-size: 800px 452px;" +
            "        background-position: top center;" +
            "        font-size: 14px;" +
            "        color: #434343;" +
            "      \">" +
            "        <header>" +
            "            <table style=\"width: 100%;\">" +
            "                <tbody>" +
            "                    <tr style=\"height: 0;\">" +
            "                        <td>" +
            "                            <img style=\"border-radius: 20px;\" alt=\"\" src=\"https://flashlearnimage.s3.ap-southeast-1.amazonaws.com/Logo/avatar.png\" height=\"20%\" />" +
            "                        </td>" +
            "                        <td style=\"text-align: right;\">" +
            "                            <span style=\"font-size: 16px; line-height: 30px; color: #ffffff; font-weight: 600;\">" + formattedDate + "</span>" +
            "                        </td>" +
            "                    </tr>" +
            "                </tbody>" +
            "            </table>" +
            "        </header>" +
            "        <main>" +
            "            <div style=\"" +
            "            margin: 0;" +
            "            margin-top: 70px;" +
            "            padding: 92px 30px 115px;" +
            "            background: #ffffff;" +
            "            border-radius: 30px;" +
            "            text-align: center;" +
            "          \">" +
            "                <div style=\"width: 100%; max-width: 489px; margin: 0 auto;\">" +
            "                    <h1 style=\"" +
            "                margin: 0;" +
            "                font-size: 24px;" +
            "                font-weight: 500;" +
            "                color: #1f1f1f;" +
            "              \">" +
            "                        Thư Mời Tham Gia Khóa Học" +
            "                    </h1>" +
            "                    <p style=\"" +
            "                margin: 0;" +
            "                margin-top: 17px;" +
            "                font-size: 16px;" +
            "                font-weight: 500;" +
            "              \">" +
            "                        Xin chào " + studentEntity.getUser().getName() + "," +
            "                    </p>" +
            "                    <p style=\"" +
            "                margin: 0;" +
            "                margin-top: 17px;" +
            "                font-weight: 500;" +
            "                letter-spacing: 0.56px;" +
            "              \">" +
            "                        Bạn nhận được lời mời tham gia khóa học <span style=\"font-weight: 600; color: #1f1f1f;\">" + courseEntity.getName() + "!</span>" +  " từ giáo viên <span style=\"font-weight: 600; color: #1f1f1f;\">" + onwer.getName() + "!</span> tại <span style=\"font-weight: 600; color: #1f1f1f;\">" + websiteName + "!</span>" +
            "                        Khóa học này sẽ giúp bạn phát triển kỹ năng và kiến thức của mình một cách toàn diện." +
            "                        <br>" +
            "                    </p>" +
            "                    <p style=\"" +
            "                   margin: 0;" +
            "                   margin-top: 17px;" +
            "                   font-weight: 500;" +
            "                   letter-spacing: 0.56px;" +
            "                   color: #ba3d4f;" +
            "                   \">" +
            "                           Hãy nhấp vào nút dưới đây để xác nhận tham gia khóa học." +
            "                       </p>" + 
            "                       <a href=" + clientUrl  + " target=\"_blank\" style=\"display: inline-block; margin-top: 30px; padding: 15px 30px; background-color: #ba3d4f; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 5px;\">" +
            "                           Tham gia khóa học" +
            "                       </a>" +
            "                   </div>" +
            "               </div>" +
            "            <p style=\"" +
            "            max-width: 400px;" +
            "            margin: 0 auto;" +
            "            margin-top: 90px;" +
            "            text-align: center;" +
            "            font-weight: 500;" +
            "            color: #8c8c8c;" +
            "          \">" +
            "                Cảm ơn bạn đã chọn <span style=\"font-weight: 600; color: #1f1f1f;\">" + websiteName + "</span>." +
            "                <br>" +
            "                Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ" +
            "                <a href=\"mailto:flashlearn02@gmail.com\" style=\"color: #499fb6; text-decoration: none;\">flashlearn02@gmail.com</a>" +
            "                hoặc đội ngũ hỗ trợ của chúng tôi tại" +
            "                <a href=\"\" target=\"_blank\" style=\"color: #499fb6; text-decoration: none;\">Trung tâm hỗ trợ FlashLearn</a>" +
            "            </p>" +
            "        </main>" +
            "        <footer style=\"" +
            "          width: 100%;" +
            "          max-width: 490px;" +
            "          margin: 20px auto 0;" +
            "          text-align: center;" +
            "          border-top: 1px solid #e6ebf1;" +
            "        \">" +
            "            <p style=\"" +
            "            margin: 0;" +
            "            margin-top: 40px;" +
            "            font-size: 16px;" +
            "            font-weight: 600;" +
            "            color: #434343;" +
            "          \">" +
            "                " + websiteName +
            "            </p>" +
            "            <p style=\"margin: 0; margin-top: 8px; color: #434343;\">" +
            "                21 Nguyễn Tuân, Sơn Trà, Đà Nẵng." +
            "            </p>" +
            "            <div style=\"margin: 0; margin-top: 16px;\">" +
            "                <a href=\"\" target=\"_blank\" style=\"display: inline-block;\">" +
            "                    <img width=\"36px\" alt=\"Facebook\" src=\"https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook\" />" +
            "                </a>" +
            "                <a href=\"\" target=\"_blank\" style=\"display: inline-block; margin-left: 8px;\">" +
            "                    <img width=\"36px\" alt=\"Instagram\" src=\"https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram\" /></a>" +
            "                <a href=\"\" target=\"_blank\" style=\"display: inline-block; margin-left: 8px;\">" +
            "                    <img width=\"36px\" alt=\"Twitter\" src=\"https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter\" />" +
            "                </a>" +
            "                <a href=\"\" target=\"_blank\" style=\"display: inline-block; margin-left: 8px;\">" +
            "                    <img width=\"36px\" alt=\"Youtube\" src=\"https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube\" /></a>" +
            "            </div>" +
            "            <p style=\"margin: 0; margin-top: 16px; color: #434343;\">" +
            "                Copyright © 2024 Company. All rights reserved." +
            "            </p>" +
            "        </footer>" +
            "    </div>" +
            "</body>" +
            "</html>";
        } else {
            String content = "Hãy nhấp vào nút dưới đây để tham gia khóa học";
            if (userEntity == null) {
                clientUrl = clientUrl + "?hasExist=false&email=" + email + "&courseId=" + courseEntity.getId();
                content = "Hãy nhấp vào nút dưới đây để đăng ký và tham gia khóa học";
            }
            return "<!DOCTYPE html>" +
            "<html lang=\"en\">" +
            "<head>" +
            "    <meta charset=\"UTF-8\" />" +
            "    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />" +
            "    <meta http-equiv=\"X-UA-Compatible\" content=\"ie=edge\" />" +
            "    <title>Static Template</title>" +
            "    <link href=\"https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600&display=swap\" rel=\"stylesheet\" />" +
            "</head>" +
            "<body style=\"" +
            "      margin: 0;" +
            "      font-family: 'Poppins', sans-serif;" +
            "      background: #ffffff;" +
            "      font-size: 14px;" +
            "    \">" +
            "    <div style=\"" +
            "        max-width: 680px;" +
            "        margin: 0 auto;" +
            "        padding: 45px 30px 60px;" +
            "        background: #f4f7ff;" +
            "        background-image: url(https://img.freepik.com/free-vector/gradient-smooth-background_23-2148974923.jpg);" +
            "        background-repeat: no-repeat;" +
            "        background-size: 800px 452px;" +
            "        background-position: top center;" +
            "        font-size: 14px;" +
            "        color: #434343;" +
            "      \">" +
            "        <header>" +
            "            <table style=\"width: 100%;\">" +
            "                <tbody>" +
            "                    <tr style=\"height: 0;\">" +
            "                        <td>" +
            "                            <img style=\"border-radius: 20px;\" alt=\"\" src=\"https://flashlearnimage.s3.ap-southeast-1.amazonaws.com/Logo/avatar.png\" height=\"20%\" />" +
            "                        </td>" +
            "                        <td style=\"text-align: right;\">" +
            "                            <span style=\"font-size: 16px; line-height: 30px; color: #ffffff; font-weight: 600;\">" + formattedDate + "</span>" +
            "                        </td>" +
            "                    </tr>" +
            "                </tbody>" +
            "            </table>" +
            "        </header>" +
            "        <main>" +
            "            <div style=\"" +
            "            margin: 0;" +
            "            margin-top: 70px;" +
            "            padding: 92px 30px 115px;" +
            "            background: #ffffff;" +
            "            border-radius: 30px;" +
            "            text-align: center;" +
            "          \">" +
            "                <div style=\"width: 100%; max-width: 489px; margin: 0 auto;\">" +
            "                    <h1 style=\"" +
            "                margin: 0;" +
            "                font-size: 24px;" +
            "                font-weight: 500;" +
            "                color: #1f1f1f;" +
            "              \">" +
            "                        Thư Mời Tham Gia Khóa Học" +
            "                    </h1>" +
            "                    <p style=\"" +
            "                margin: 0;" +
            "                margin-top: 17px;" +
            "                font-size: 16px;" +
            "                font-weight: 500;" +
            "              \">" +
            "                        Xin chào " + email + "," +
            "                    </p>" +
            "                    <p style=\"" +
            "                margin: 0;" +
            "                margin-top: 17px;" +
            "                font-weight: 500;" +
            "                letter-spacing: 0.56px;" +
            "              \">" +
            "                        Bạn nhận được lời mời tham gia khóa học <span style=\"font-weight: 600; color: #1f1f1f;\">" + courseEntity.getName() + "</span>" +  " từ giáo viên <span style=\"font-weight: 600; color: #1f1f1f;\">" + onwer.getName() + "</span> tại <span style=\"font-weight: 600; color: #1f1f1f;\">" + websiteName + "!</span>" +
            "                        Khóa học này sẽ giúp bạn phát triển kỹ năng và kiến thức của mình một cách toàn diện." +
            "                        <br>" +
            "                    </p>" +
            "                    <p style=\"" +
            "                   margin: 0;" +
            "                   margin-top: 17px;" +
            "                   font-weight: 500;" +
            "                   letter-spacing: 0.56px;" +
            "                   color: #ba3d4f;" +
            "                   \">" +
            "                           " + content + "" +
            "                       </p>" + 
            "                       <a href=" + clientUrl  + " target=\"_blank\" style=\"display: inline-block; margin-top: 30px; padding: 15px 30px; background-color: #ba3d4f; color: #ffffff; font-size: 16px; font-weight: 600; text-decoration: none; border-radius: 5px;\">" +
            "                           Tham gia khóa học" +
            "                       </a>" +
            "                   </div>" +
            "               </div>" +
            "            <p style=\"" +
            "            max-width: 400px;" +
            "            margin: 0 auto;" +
            "            margin-top: 90px;" +
            "            text-align: center;" +
            "            font-weight: 500;" +
            "            color: #8c8c8c;" +
            "          \">" +
            "                Cảm ơn bạn đã chọn <span style=\"font-weight: 600; color: #1f1f1f;\">" + websiteName + "</span>." +
            "                <br>" +
            "                Nếu có bất kỳ thắc mắc nào, vui lòng liên hệ" +
            "                <a href=\"mailto:flashlearn02@gmail.com\" style=\"color: #499fb6; text-decoration: none;\">flashlearn02@gmail.com</a>" +
            "                hoặc đội ngũ hỗ trợ của chúng tôi tại" +
            "                <a href=\"\" target=\"_blank\" style=\"color: #499fb6; text-decoration: none;\">Trung tâm hỗ trợ FlashLearn</a>" +
            "            </p>" +
            "        </main>" +
            "        <footer style=\"" +
            "          width: 100%;" +
            "          max-width: 490px;" +
            "          margin: 20px auto 0;" +
            "          text-align: center;" +
            "          border-top: 1px solid #e6ebf1;" +
            "        \">" +
            "            <p style=\"" +
            "            margin: 0;" +
            "            margin-top: 40px;" +
            "            font-size: 16px;" +
            "            font-weight: 600;" +
            "            color: #434343;" +
            "          \">" +
            "                " + websiteName +
            "            </p>" +
            "            <p style=\"margin: 0; margin-top: 8px; color: #434343;\">" +
            "                21 Nguyễn Tuân, Sơn Trà, Đà Nẵng." +
            "            </p>" +
            "            <div style=\"margin: 0; margin-top: 16px;\">" +
            "                <a href=\"\" target=\"_blank\" style=\"display: inline-block;\">" +
            "                    <img width=\"36px\" alt=\"Facebook\" src=\"https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661502815169_682499/email-template-icon-facebook\" />" +
            "                </a>" +
            "                <a href=\"\" target=\"_blank\" style=\"display: inline-block; margin-left: 8px;\">" +
            "                    <img width=\"36px\" alt=\"Instagram\" src=\"https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661504218208_684135/email-template-icon-instagram\" /></a>" +
            "                <a href=\"\" target=\"_blank\" style=\"display: inline-block; margin-left: 8px;\">" +
            "                    <img width=\"36px\" alt=\"Twitter\" src=\"https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503043040_372004/email-template-icon-twitter\" />" +
            "                </a>" +
            "                <a href=\"\" target=\"_blank\" style=\"display: inline-block; margin-left: 8px;\">" +
            "                    <img width=\"36px\" alt=\"Youtube\" src=\"https://archisketch-resources.s3.ap-northeast-2.amazonaws.com/vrstyler/1661503195931_210869/email-template-icon-youtube\" /></a>" +
            "            </div>" +
            "            <p style=\"margin: 0; margin-top: 16px; color: #434343;\">" +
            "                Copyright © 2024 Company. All rights reserved." +
            "            </p>" +
            "        </footer>" +
            "    </div>" +
            "</body>" +
            "</html>";
        }
    }



}
