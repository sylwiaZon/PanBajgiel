package com.models;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class DetailsRowMapper implements RowMapper<Details> {
    //Class in charge of translating sql response into object

    @Override
    public Details mapRow(ResultSet rs, int rowNum) throws SQLException {

        return new Details(rs.getInt("transactionId"),rs.getInt("productId"), rs.getInt("amount"));
    }

}
