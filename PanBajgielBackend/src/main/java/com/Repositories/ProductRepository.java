package com.Repositories;

import com.Models.ProductRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import java.sql.SQLException;


public class ProductRepository {

    public ProductList getAllProductsFromDataBase(JdbcTemplate jdbcTemplate){
        try {
            if ( jdbcTemplate.getDataSource().getConnection() != null) {
                String sql = "Select * from product";
                ProductList productsFromDataBase = new ProductList();
                productsFromDataBase.setProducts(jdbcTemplate.query(sql, new ProductRowMapper()));
                return productsFromDataBase;
            }
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public ProductList findProducts(String productId, JdbcTemplate jdbcTemplate){
        try {
            if ( jdbcTemplate.getDataSource().getConnection() != null) {
                String sql = "Select * from product where id in ( "+ productId +")";
                ProductList products = new ProductList();
                products.setProducts(jdbcTemplate.query(sql, new ProductRowMapper()));
                return products;
            }
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
