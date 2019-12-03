package com.Controllers;

import com.Models.Shop;
import com.Models.ShopRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;

import javax.sql.DataSource;

import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;

@Controller
public class DataBaseTest{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    @RequestMapping(name = "/dbTest", method = RequestMethod.GET)
    public ModelAndView greet() {

        try {
            if ( jdbcTemplate.getDataSource().getConnection() != null) { //sprawdzamy czy sie polaczylo, jesli tak to tu dzialamy dalej ^^
                System.out.println("jest ok");
                String sql = "Select * from shop";      // polecenie

                List<Shop> shops = jdbcTemplate.query(
                        sql,
                        new ShopRowMapper()); // tworzy obiekty pobrane z bazy ( nazwaTabeliROWMAPPER)
                System.out.println(shops);
                return new ModelAndView("dbTest", "msg", "Database Connection Successfully Established.");

            } else {
                System.out.println("jest nie ok");
                return new ModelAndView("dbTest", "msg", "Failed to connect database.");
            }
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("jest nie ok");
            return new ModelAndView("dbTest", "msg", "Failed to connect database.");
        }
    }

}
