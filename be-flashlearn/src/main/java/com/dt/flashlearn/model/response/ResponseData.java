package com.dt.flashlearn.model.response;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseData {
    private Object data;
    private ResponsePage page;

    public ResponseData(Object data) {
        this.data = data;
    }

    public ResponseData(Object data, ResponsePage page) {
        this.data = data;
        this.page = page;
    }
}
