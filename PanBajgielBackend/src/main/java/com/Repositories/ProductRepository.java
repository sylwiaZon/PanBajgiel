package com.Repositories;

import com.Models.Product;
import com.Models.ProductRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.sql.SQLException;
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
        try {
            if ( jdbcTemplate.getDataSource().getConnection() != null) {
                String sql = "Select * from product";
                List<Product> productsFromDataBase = new ArrayList<Product>(jdbcTemplate.query(sql, new ProductRowMapper()));
                if(productsFromDataBase.isEmpty()){
                    return null;
                }
                else{
                    return productsFromDataBase;
                }
            }
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Product> findProducts(String productId){
        try {
            if ( jdbcTemplate.getDataSource().getConnection() != null) {
                String sql = "Select * from product where id in ( "+ productId +")";
                List<Product> productsFromDataBase = new ArrayList<Product>(jdbcTemplate.query(sql, new ProductRowMapper()));
                if(productsFromDataBase.isEmpty()){
                    return null;
                }
                else{
                    return productsFromDataBase;
                }
            }
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
