package com.models;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class DetailsRowMapper implements RowMapper<Details> {
    @Override
    public Details mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new Details(rs.getInt("transaction_id"),rs.getInt("product_id"), rs.getInt("amount"));
    }

}
