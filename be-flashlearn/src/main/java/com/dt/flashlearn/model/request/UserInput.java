package com.dt.flashlearn.model.request;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserInput {
    
    @NotBlank
    private String email;
    @NotBlank
    private String name;
    private String phone;
}
