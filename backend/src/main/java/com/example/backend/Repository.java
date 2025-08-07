package com.example.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

@org.springframework.stereotype.Repository
public class Repository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    public List<Item> getItems() {
        return jdbcTemplate.query("select items.id, items.name, items.done, categories.name as category from items join categories on categories.id = items.category_id", BeanPropertyRowMapper.newInstance(Item.class));
    }

    public List<Category> getCategories() {
        return jdbcTemplate.query("SELECT id, name from categories",  BeanPropertyRowMapper.newInstance(Category.class));
    }

    public int getCategoryId(String categoryName) {
        try {
            Integer id = jdbcTemplate.queryForObject("select id from categories where name = ?", Integer.class, categoryName);

            if (id == null) {
                return -1;
            }
            return id;
        } catch (DataAccessException e) {
            return -1;
        }
    }

    public int addCategory(String category) {
        int categoryId = getCategoryId(category);

        if (categoryId == -1) {
            jdbcTemplate.update("INSERT INTO categories (name) VALUES (?)", category);
        }

        return getCategoryId(category);
    }

    public int addItem(String name, String category) {
        int id = addCategory(category);

        return jdbcTemplate.update("INSERT INTO items (name, done, category_id) VALUES (?, false, ?)", name, id);
    }

   public int updateItem(int id, String updatedName) {
        return jdbcTemplate.update("UPDATE items set name = ? where id = ?", updatedName, id);
   }

   public int toggleDone(int id) {
        return jdbcTemplate.update("UPDATE items set done = NOT done where id = ?", id);
   }

   public int deleteItem(int id) {
        return jdbcTemplate.update("DELETE FROM items where id = ?", id);
   }

}
