package com.dt.flashlearn.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.dt.flashlearn.constant.ErrorConstants;
import com.dt.flashlearn.constant.SuccessConstants;
import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.User;
import com.dt.flashlearn.model.request.LoginInput;
import com.dt.flashlearn.model.response.ResponseBody;
import com.dt.flashlearn.model.response.ResponseData;
import com.dt.flashlearn.model.response.ResponseError;
import com.dt.flashlearn.model.response.ResponseLogin;
import com.dt.flashlearn.security.jwt.JwtProvider;
import com.dt.flashlearn.security.userprical.CustomAuthenticationProvider;
import com.dt.flashlearn.security.userprical.UserPrinciple;
import com.dt.flashlearn.service.UserService;
import com.dt.flashlearn.converter.UserConverter;

import jakarta.validation.Valid;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;



@RestController
@RequestMapping("api/auth")
public class AuthController {

    @Autowired
    PasswordEncoder passwordEncoder;

    @Autowired
    private CustomAuthenticationProvider customAuthenticationProvider;

    @Autowired
    JwtProvider jwtProvider;

    @Autowired
    private UserService userService;
    
    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginInput input) {
        try {
            Authentication authentication = customAuthenticationProvider.authenticate( new UsernamePasswordAuthenticationToken(input.getEmail(), input.getPassword()));
            SecurityContextHolder.getContext().setAuthentication(authentication);
            String token = jwtProvider.createToken(authentication);
            UserPrinciple userPrinciple = (UserPrinciple) authentication.getPrincipal();
            ResponseLogin body = new ResponseLogin();
            body.setCode(SuccessConstants.OK_CODE);
            body.setMessage(Arrays.asList(SuccessConstants.OK_MESSAGE));
            body.setAccessToken(token);
            body.setData(UserConverter.userPrincipleToModel(userPrinciple));
            return ResponseEntity.ok(body);
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(createErrorResponse(e));
        }
        
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody User input) {
        try {
            ResponseBody response = new ResponseBody();
            response.setCode(SuccessConstants.CREATED_CODE);
            response.setMessage(Arrays.asList(new MessageException(SuccessConstants.CREATED_MESSAGE), SuccessConstants.CREATED_CODE));
            response.setData(new ResponseData(userService.createUser(input)));
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(createErrorResponse(e));
        }
        
    }


    private ResponseError createErrorResponse(MessageException e) {
        ResponseError response = new ResponseError();
        response.setCode(e.getErrorCode());
        response.setMessage(Arrays.asList(e));
        return response;
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    public ResponseError handleValidationExceptions(MethodArgumentNotValidException ex){
        ResponseError response = new ResponseError();
        response.setCode(ErrorConstants.INVALID_CREDENTIALS_CODE);
        List<Object> messages = new ArrayList<>();
        ex.getBindingResult().getAllErrors().forEach((error)->{
            String fieldName = ((FieldError) error).getField();
            messages.add(new MessageException(fieldName + ": " + error.getDefaultMessage(), response.getCode()));
        });
        response.setMessage(messages);
        return response;
    }
    
    
}
