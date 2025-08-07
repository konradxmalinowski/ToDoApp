package com.example.backend;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ResponseObjectItems {
    private List<Item> result;
//    private List<Category> categories;
    private boolean success;
    private String message;

    //  GET success
    public ResponseObjectItems(boolean success, List<Item> result) {
        this.result = result;
        this.success = success;
    }

//    public ResponseObjectItems(boolean success, List<Category> result) {
//        this.categories = result;
//        this.success = success;
//    }

    //  GET/POST/PUT/PATCH/DELETE error
    public ResponseObjectItems(boolean success, String message) {
        this.success = success;
        this.message = message;
    }

//  POST/PUT/PATCH/DELETE success
    public ResponseObjectItems(boolean success) {
        this.success = success;
    }
}
