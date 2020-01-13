package com.repositories;

import com.models.Shop;
import com.models.ShopRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
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
        String sql = "Select * from shop";
        List<Shop> shopsFromDataBase = new ArrayList<Shop>(jdbcTemplate.query(sql, new ShopRowMapper()));
        if(shopsFromDataBase.isEmpty()){
            return null;
        }
        return shopsFromDataBase;
    }

    public List<Shop> getShop(String shopId){
        String sql = "Select * from shop where id in ( "+ shopId +")";
        List<Shop> shopsFromDataBase = new ArrayList<Shop>(jdbcTemplate.query(sql, new ShopRowMapper()));
        if(shopsFromDataBase.isEmpty()){
            return null;
        }
        return shopsFromDataBase;
    }
}
