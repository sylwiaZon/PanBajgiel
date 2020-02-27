package com.repositories;

import com.models.UserRowMapper;
import com.models.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
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
        if(!users.isEmpty()) {
            return users.get(0);
        } else {
            return null;
        }
    }

    public User login(String login, String password){
        String sql = "Select * from user where login = '" + login + "' and password = '" + password + "';";
        return getUserFromDB(sql);
    }

    public User getUser(String login){
        String sql = "Select * from user where login = '" + login + "';";
        return getUserFromDB(sql);
    }

    public User updateState(String login, Integer state, String stateName){
        String sql = "UPDATE user SET " + stateName + " = " + state + " WHERE login = \"" + login + "\";";
        jdbcTemplate.execute(sql);
        return getUser(login);
    }

    public User changePassword(User user) {
        String sql = "UPDATE user SET password = \"" + user.getPassword() + "\" where login = \"" + user.getLogin() + "\";";
        jdbcTemplate.execute(sql);
        return getUser(user.getLogin());
    }

    public User register(User user){
        Boolean userExists = getUser(user.getLogin()) != null ? true : false;
        if (!userExists) {
            String sql =
                    String.format("INSERT INTO user (login, password, name, points, stamps, type) VALUES ('%s', '%s', '%s',0,0,1); ",
                            user.getLogin(), user.getPassword(), user.getName());

            jdbcTemplate.execute(sql);
            return login(user.getLogin(), user.getPassword());
        } else {
            return null;
        }
    }

    public boolean delete(String login){
       String sql =
                String.format("DELETE FROM user WHERE login = '" + login + "';");

        jdbcTemplate.execute(sql);
        return true;
    }
}
