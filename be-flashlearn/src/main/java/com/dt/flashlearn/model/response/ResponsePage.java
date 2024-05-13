package com.dt.flashlearn.model.response;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ResponsePage {
    private int currentPage;
    private int perPage;
    private long totalItems;
    private int totalPages;

    public ResponsePage(int currentPage, int perPage, long totalItems, int totalPages) {
        this.currentPage = currentPage;
        this.perPage = perPage;
        this.totalItems = totalItems;
        this.totalPages = totalPages;
    }

}
