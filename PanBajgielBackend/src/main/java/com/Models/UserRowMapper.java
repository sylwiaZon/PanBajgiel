package com.Models;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class UserRowMapper implements RowMapper<User> {

    @Override
    public User mapRow(ResultSet rs, int rowNum) throws SQLException {

        return new User(rs.getString("login"),rs.getString("password"), rs.getString("name"), rs.getInt("points"), rs.getInt("stamps"), rs.getInt("client"));
    }

}
