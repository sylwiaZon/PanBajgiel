package com.models;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class StatisticsRowMapper{

    public static class ShopStatisticsRowMapper implements RowMapper<Statistics.ShopStatistics> {

        @Override
        public Statistics.ShopStatistics mapRow(ResultSet rs, int rowNum) throws SQLException {

            return new Statistics.ShopStatistics(rs.getString("address"),rs.getInt("amount"));
        }

    }

    public static class BajgielStatisticsRowMapper implements RowMapper<Statistics.BajgielStatistics> {

        @Override
        public Statistics.BajgielStatistics mapRow(ResultSet rs, int rowNum) throws SQLException {

            return new Statistics.BajgielStatistics(rs.getString("name"), rs.getInt("amount"));
        }

    }

}