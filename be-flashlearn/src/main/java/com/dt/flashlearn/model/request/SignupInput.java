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

    @NotBlank
    @Size(max = 50)
    @Email(message = "Email không đúng định dạng")
    private String email;

    @NotBlank
    @Pattern(regexp = "(?=.*[0-9]).+", message = "Mật khẩu phải có ít nhất 1 chứ số")
    @Pattern(regexp = "(?=.*[a-z]).+", message = "Mật khẩu phải có ít nhất 1 chữ thường")
    @Pattern(regexp = "(?=.*[A-Z]).+", message = "Mật khẩu phải có ít nhất 1 chữ hoa")
    @Pattern(regexp = "(?=.*[@#$%^&+=]).+", message = "Mật khẩu phải có ít nhất 1 kí tự đặc biệt")
    @Size(min = 6, max = 255, message = "Mật khẩu có ít nhất 6 kí tự và nhiều nhất 50 kí tự")
    private String password;

    // @NotNull
    // private Long encodeOTP;
}
