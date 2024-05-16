package com.dt.flashlearn.constant;

public class ErrorConstants {

    public static final int INVALID_DATA_CODE = 400;
    public static final String INVALID_DATA_MESSAGE = "Dữ liệu gửi đi không chính xác";

    public static final int OLD_PASSWORD_INCORRECT_CODE = 400;
    public static final String OLD_PASSWORD_INCORRECT_MESSAGE = "Mật khẩu cũ không chính xác";

    public static final int INVALID_CREDENTIALS_CODE = 401;
    public static final String INVALID_CREDENTIALS_MESSAGE = "Email hoặc mật khẩu không chính xác";

    public static final int UNAUTHORIZED_CODE = 401;
    public static final String UNAUTHORIZED_MESSAGE = "Không có quyền truy cập. Vui lòng đăng nhập lại";

    public static final int FORBIDDEN_CODE = 403;
    public static final String FORBIDDEN_MESSAGE = "Không đủ quyền. Vui lòng truy cập tài khoản có quyền.";

    public static final int NOT_FOUND_CODE = 404;
    public static final String NOT_FOUND_MESSAGE = "Dữ liệu không tìm thấy";

    public static final int USER_NOT_FOUND_CODE = 404;
    public static final String USER_NOT_FOUND_MESSAGE = "Người dùng không tồn tại";

    public static final int EMAIL_ALREADY_EXISTS_CODE = 409;
    public static final String EMAIL_ALREADY_EXISTS_MESSAGE = "Email đã tồn tại trong hệ thống";

    public static final String EMAIL_INVALID_MESSAGE = "Email không hợp lệ";

}
