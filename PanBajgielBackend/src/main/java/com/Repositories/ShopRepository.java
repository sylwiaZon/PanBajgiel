package com.Repositories;

import com.Models.ShopRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import java.sql.SQLException;


public class ShopRepository {

    public ShopList getAllShopsFromDataBase(JdbcTemplate jdbcTemplate){
        try {
            if ( jdbcTemplate.getDataSource().getConnection() != null) {
                String sql = "Select * from shop";
                ShopList shopsFromDataBase = new ShopList();
                shopsFromDataBase.setShops(jdbcTemplate.query(sql, new ShopRowMapper()));
                return shopsFromDataBase;
            }
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }

    public ShopList findShops(String shopId, JdbcTemplate jdbcTemplate){
        try {
            if ( jdbcTemplate.getDataSource().getConnection() != null) {
                String sql = "Select * from shop where id in ( "+ shopId +")";
                ShopList shops = new ShopList();
                shops.setShops(jdbcTemplate.query(sql, new ShopRowMapper()));
                return shops;
            }
        }
        catch (SQLException e) {
            e.printStackTrace();
        }
        return null;
    }
}
