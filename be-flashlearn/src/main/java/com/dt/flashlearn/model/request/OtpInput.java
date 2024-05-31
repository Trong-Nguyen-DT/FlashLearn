package com.dt.flashlearn.model.request;

import com.dt.flashlearn.constant.ErrorConstants;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class OtpInput {
    
    @NotBlank
    @Size(max = 50)
    @Email(message = ErrorConstants.EMAIL_INVALID_MESSAGE)
    private String email;
    
    private Boolean isSignUp = true;
}
