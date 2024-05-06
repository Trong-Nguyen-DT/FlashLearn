package com.dt.flashlearn.model.response;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseError {
    private int code;
    private List<Object> message;
}
