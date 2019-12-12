package com.repositories;

import com.Models.UserRowMapper;
import com.Models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.sql.SQLException;
import java.util.List;

@Repository
public class UserRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private User getUserFromDB(String sql){
        List<User> users = jdbcTemplate.query(sql, new UserRowMapper());
        if(users.size() > 0) {
            return users.get(0);
        } else {
            return null;
        }
    }

    public User login(String login, String password){
        try {
            if ( jdbcTemplate.getDataSource().getConnection() != null) {
                String sql = "Select * from user where login = '" + login + "' and password = '" + password + "';";      // polecenie
                return getUserFromDB(sql);
            } else {
                return null;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public User getUser(String login){
        try {
            if ( jdbcTemplate.getDataSource().getConnection() != null) {
                String sql = "Select * from user where login = '" + login + "';";
                return getUserFromDB(sql);
            } else {
                return null;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public User updateState(String login, Integer state, String stateName){
        try {
            if ( jdbcTemplate.getDataSource().getConnection() != null) {
                String sql = "UPDATE user SET " + stateName + " = " + state + " WHERE login = \"" + login + "\";";      // polecenie
                jdbcTemplate.execute(sql);
                return getUser(login);
            } else {
                return null;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }

    public User register(User user){
        try {
            if ( jdbcTemplate.getDataSource().getConnection() != null) {
                Boolean userExists = getUser(user.getLogin()) != null ? true : false;
                if (!userExists) {
                    String sql =
                            String.format("INSERT INTO user (login, password, name, points, stamps, client) VALUES ('%s', '%s', '%s',0,0,1); ",
                                    user.getLogin(), user.getPassword(), user.getName());

                    jdbcTemplate.execute(sql);
                    return login(user.getLogin(), user.getPassword());
                } else {
                    return null;
                }
            } else {
                return null;
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return null;
        }
    }


    public boolean delete(String login){
        try {
            if( jdbcTemplate.getDataSource().getConnection() != null) {
                String sql =
                        String.format("DELETE FROM user WHERE login = '" + login + "';");

                jdbcTemplate.execute(sql);
                return true;

            } else {
                return Boolean.parseBoolean(null);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            return Boolean.parseBoolean(null);
        }
    }
}
