package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class Controller {

    ResponseObjectItems responseObjectItems;
    @Autowired
    Repository repository;

    @GetMapping("/items")
    public ResponseObjectItems getItems() {
        List<Item> items;
        try {
            items = repository.getItems();
            return new ResponseObjectItems(true, items);
        } catch (Exception e) {
            return new ResponseObjectItems(false, e.getMessage());
        }
    }

    @GetMapping("/categories")
    public ResponseObjectCategories getCategories() {
        List<Category> categories;
        try {
            categories = repository.getCategories();
            return new ResponseObjectCategories(true, categories);
        } catch (Exception e) {
            return new ResponseObjectCategories(false, e.getMessage());
        }
    }

    @PostMapping("/items")
    public ResponseObjectItems addItem(@RequestBody RequestAddItem requestAddItem) {
        try {
            int insertedRows = repository.addItem(requestAddItem.getName(), requestAddItem.getCategory());
            if (insertedRows == 1) {
                return new ResponseObjectItems(true);
            }

            return new ResponseObjectItems(false, "Failed to insert item");
        } catch (Exception e) {
            return new ResponseObjectItems(false, e.getMessage());
        }
    }

    @PatchMapping("/items/{id}/name")
    public ResponseObjectItems updateItem(@PathVariable int id, @RequestBody UpdateNameRequest body) {
        try {
            int affectedRows = repository.updateItem(id, body.getUpdatedName());

            if (affectedRows == 1) {
                return new ResponseObjectItems(true);
            }
                return new ResponseObjectItems(false, "Failed to update item");

        } catch (Exception e) {
            return new ResponseObjectItems(false, e.getMessage());
        }
    }

    @PatchMapping("/items/{id}/done")
    public ResponseObjectItems toggleDone(@PathVariable int id) {
        try {
            int affectedRows = repository.toggleDone(id);
            if (affectedRows == 1) {
                return new ResponseObjectItems(true);
            }

            return new ResponseObjectItems(false, "Failed to update item");
        } catch (Exception e) {
           return  new ResponseObjectItems(false, e.getMessage());
        }
    }

    @DeleteMapping("/items/{id}")
    public ResponseObjectItems deleteItem(@PathVariable int id) {
        try {
            int deletedRows = repository.deleteItem(id);
            if (deletedRows == 1) {
                return new ResponseObjectItems(true);
            }
            return new ResponseObjectItems(false, "Failed to delete item");
        } catch (Exception e) {
            return new ResponseObjectItems(false, e.getMessage());
        }
    }
}
