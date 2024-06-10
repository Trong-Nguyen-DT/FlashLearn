package com.dt.flashlearn.model.request;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class SignupInput {

    @NotBlank(message = "Email không được để trống")
    @Size(max = 50)
    @Email(message = "Email không đúng định dạng")
    private String email;

    @NotBlank(message = "Mật khẩu không được để trống")
    @Pattern(regexp = "(?=.*[0-9]).+", message = "Mật khẩu phải có ít nhất 1 chứ số")
    @Pattern(regexp = "(?=.*[a-z]).+", message = "Mật khẩu phải có ít nhất 1 chữ thường")
    @Pattern(regexp = "(?=.*[A-Z]).+", message = "Mật khẩu phải có ít nhất 1 chữ hoa")
    @Pattern(regexp = "(?=.*[@#$%^&+=]).+", message = "Mật khẩu phải có ít nhất 1 kí tự đặc biệt")
    @Size(min = 6, max = 50, message = "Mật khẩu có ít nhất 6 kí tự và nhiều nhất 50 kí tự")
    private String password;

    @NotBlank(message = "Tên không được để trống")
    @Size(min = 3, max = 30, message = "Tên có ít nhất 3 kí tự và nhiều nhất 30 kí tự")
    private String name;

    private String avatar;

    @Size(min = 10, max = 10, message = "Số điện thoại phải có 10 chữ số")
    @Pattern(regexp = "^(\\+\\d{1,3}[- ]?)?\\d{10}$", message = "Số điện thoại không đúng định dạng")
    private String phone;

    @NotBlank(message = "Mã OTP không được để trống")
    private String otp;

    @NotBlank(message = "Mã hash OTP không được để trống")
    private String encodeOTP;
}
