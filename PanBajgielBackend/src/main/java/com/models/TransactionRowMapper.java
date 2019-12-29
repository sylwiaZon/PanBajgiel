package com.models;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class TransactionRowMapper implements RowMapper<Transaction> {

    @Override
    public Transaction mapRow(ResultSet rs, int rowNum) throws SQLException {

        return new Transaction(rs.getInt("id"),rs.getString("user_login"), rs.getInt("shop_id"), rs.getString("date"));
    }

}