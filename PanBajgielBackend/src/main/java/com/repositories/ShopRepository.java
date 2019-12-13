package com.repositories;

import com.Models.Shop;
import com.Models.ShopRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ShopRepository {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public ShopRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Shop> getAllShopsFromDataBase(){
        try {
            if ( jdbcTemplate.getDataSource().getConnection() != null) {
                String sql = "Select * from shop";
                List<Shop> shopsFromDataBase = new ArrayList<Shop>(jdbcTemplate.query(sql, new ShopRowMapper()));
                if(shopsFromDataBase.isEmpty()){
                    return null;
                }
                else{
                    return shopsFromDataBase;
                }
            }
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Shop> findShops(String shopId){
        try {
            if ( jdbcTemplate.getDataSource().getConnection() != null) {
                String sql = "Select * from shop where id in ( "+ shopId +")";
                List<Shop> shopsFromDataBase = new ArrayList<Shop>(jdbcTemplate.query(sql, new ShopRowMapper()));
                if(shopsFromDataBase.isEmpty()){
                    return null;
                }
                else{
                    return shopsFromDataBase;
                }
            }
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
