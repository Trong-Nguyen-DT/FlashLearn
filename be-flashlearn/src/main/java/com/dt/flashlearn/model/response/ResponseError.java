package com.dt.flashlearn.model.response;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseError {
    private int code;
    private List<Object> message;

    public ResponseError() {
    }

    public ResponseError(int code, List<Object> message) {
        this.code = code;
        this.message = message;
    }
}
