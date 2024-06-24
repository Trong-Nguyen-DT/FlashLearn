package com.dt.flashlearn.model.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInput {
    
    @NotBlank(message = "Email không được để trống")
    private String email;
    @NotBlank(message = "Tên không được để trống")
    @Size(min = 3, max = 30, message = "Tên phải từ 3 đến 30 ký tự")
    private String name;
    private String phone;
}
