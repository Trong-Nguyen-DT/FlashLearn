package com.dt.flashlearn.model.response;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseLogin {
    private Integer code;
    private List<Object> message;
    private Object data;
    private String accessToken;
}
