package com.example.backend;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ResponseObjectCategories {
    private List<Category> result;
    private boolean success;
    private String message;

    //  GET success
    public ResponseObjectCategories(boolean success, List<Category> result) {
        this.result = result;
        this.success = success;
    }


    //  GET/POST/PUT/PATCH/DELETE error
    public ResponseObjectCategories(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    //  POST/PUT/PATCH/DELETE success
    public ResponseObjectCategories(boolean success) {
        this.success = success;
    }


}
