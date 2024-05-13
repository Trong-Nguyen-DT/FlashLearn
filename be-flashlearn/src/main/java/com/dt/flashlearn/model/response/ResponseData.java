package com.dt.flashlearn.model.response;

import java.util.List;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponseData {
    private Object objectData;
    private List<Object> arrayData;
    private ResponsePage page;

    public ResponseData(Object objectData) {
        this.objectData = objectData;
    }

    public ResponseData(List<Object> arrayData) {
        this.arrayData = arrayData;
    }

    public ResponseData(List<Object> arrayData, ResponsePage page) {
        this.arrayData = arrayData;
        this.page = page;
    }
}
