package com.repositories;

import com.models.Product;
import com.models.ProductRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ProductRepository {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public ProductRepository(JdbcTemplate jdbcTemplate) {

        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Product> getAllProductsFromDataBase(){
        String sql = "Select * from product";
        List<Product> productsFromDataBase = new ArrayList<Product>(jdbcTemplate.query(sql, new ProductRowMapper()));
        if(productsFromDataBase.isEmpty()){
            return null;
        }
        return productsFromDataBase;
    }

    public List<Product> getProduct(String productId){
        String sql = "Select * from product where id in ( "+ productId +")";
        List<Product> productsFromDataBase = new ArrayList<Product>(jdbcTemplate.query(sql, new ProductRowMapper()));
        if(productsFromDataBase.isEmpty()) {
            return null;
        }
        return productsFromDataBase;
    }
}
