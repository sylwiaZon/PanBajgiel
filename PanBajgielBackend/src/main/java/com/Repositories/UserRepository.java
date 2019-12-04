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
                String sql = "Select * from user where login = '" + user.getLogin() + "' and password = '" + user.getPassword() + "';";      // polecenie

                List<User> users = jdbcTemplate.query(
                        sql,
                        new UserRowMapper());
                if(users.size() > 0) {
                    return users.get(0);
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            System.out.println("jest nie ok");
            return null;
        }
    }

    public User register(User user, JdbcTemplate jdbcTemplate){
        try {
            if ( jdbcTemplate.getDataSource().getConnection() != null) {
                String sql =
                        String.format("INSERT INTO user (login, password, name, points, stamps, client) VALUES ('%s', '%s', '%s',0,0,1); ",
                                user.getLogin(), user.getPassword(), user.getName());

                jdbcTemplate.execute(sql);
                return login(user,jdbcTemplate);

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
