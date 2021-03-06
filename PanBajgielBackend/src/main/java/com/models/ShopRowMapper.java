package com.models;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class ShopRowMapper implements RowMapper <Shop>{
    //Class in charge of translating sql response into object

    @Override
    public Shop mapRow(ResultSet rs, int rowNum) throws SQLException {

        return new Shop(rs.getInt("id"),rs.getString("localization"), rs.getString("address"));
    }

}
