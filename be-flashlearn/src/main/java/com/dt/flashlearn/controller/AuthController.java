package com.dt.flashlearn.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dt.flashlearn.constant.SuccessConstants;
import com.dt.flashlearn.exception.MessageException;
import com.dt.flashlearn.model.User;
import com.dt.flashlearn.model.request.LoginInput;
import com.dt.flashlearn.model.response.ResponseError;
import com.dt.flashlearn.model.response.ResponseLogin;
import com.dt.flashlearn.security.jwt.JwtProvider;
import com.dt.flashlearn.security.userprical.CustomAuthenticationProvider;
import com.dt.flashlearn.security.userprical.UserPrinciple;
import com.dt.flashlearn.service.UserService;
import com.dt.flashlearn.service.component.ResponseHandler;
import com.dt.flashlearn.converter.UserConverter;

import jakarta.validation.Valid;

import java.util.Arrays;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
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

    @Autowired
    private ResponseHandler responseHandler;
    
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
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
        
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signup(@Valid @RequestBody User input) {
        try {
            return ResponseEntity.status(HttpStatus.CREATED).body(responseHandler.createCreatedResponse(userService.createUser(input)));
        } catch (MessageException e) {
            return ResponseEntity.status(e.getErrorCode()).body(responseHandler.createErrorResponse(e));
        }
        
    }
    
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseError handleValidationExceptions(MethodArgumentNotValidException ex) {
        return responseHandler.handleValidationExceptions(ex);
    }
}
