package com.Repositories;

import com.Models.UserRowMapper;
import com.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.sql.SQLException;
import java.util.List;

public class UserRepository {

    public User login(User user, JdbcTemplate jdbcTemplate){
        try {
            if ( jdbcTemplate.getDataSource().getConnection() != null) {
                String sql = "Select * from user where login = " + user.getLogin() + " and password = " + user.getPassword() + ";";      // polecenie

                List<User> users = jdbcTemplate.query(
                        sql,
                        new UserRowMapper());
                return users.get(0);

            } else {
                return null;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("jest nie ok");
            return null;
        }
    }
}
