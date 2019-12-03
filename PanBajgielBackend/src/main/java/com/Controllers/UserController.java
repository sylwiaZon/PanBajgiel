package com.Controllers;
import com.Models.Shop;
import com.Models.ShopRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.sql.SQLException;
import java.util.List;

@RestController
public class UserController {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @RequestMapping("/")
    public String display()
    {
        try {
            if ( jdbcTemplate.getDataSource().getConnection() != null) { //sprawdzamy czy sie polaczylo, jesli tak to tu dzialamy dalej ^^
                System.out.println("jest ok");
                String sql = "Select * from shop";      // polecenie

                List<Shop> shops = jdbcTemplate.query(
                        sql,
                        new ShopRowMapper()); // tworzy obiekty pobrane z bazy ( nazwaTabeliROWMAPPER)
                System.out.println(shops);
                return "Database Connection Successfully Established.";

            } else {
                System.out.println("jest nie ok");
                return "nie ok";
            }
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("jest nie ok");
            return "nie ok";
        }
    }
}
