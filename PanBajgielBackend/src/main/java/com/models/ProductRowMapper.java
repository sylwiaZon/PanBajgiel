package com.models;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ProductRowMapper implements RowMapper<Product> {
    //Class in charge of translating sql response into object

    @Override
    public Product mapRow(ResultSet rs, int rowNum) throws SQLException {

        return new Product(rs.getInt("id"),rs.getString("name"), rs.getFloat("price"));
    }

}
