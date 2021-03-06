package com.models;

import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class StatisticsRowMapper{
    //Class in charge of translating sql response into object

    public static class ShopsStatisticsRowMapper implements RowMapper<Statistics.ShopsStatistics> {

        @Override
        public Statistics.ShopsStatistics mapRow(ResultSet rs, int rowNum) throws SQLException {

            return new Statistics.ShopsStatistics(rs.getString("address"),rs.getInt("amount"));
        }

    }

    public static class BajgielStatisticsRowMapper implements RowMapper<Statistics.BajgielStatistics> {

        @Override
        public Statistics.BajgielStatistics mapRow(ResultSet rs, int rowNum) throws SQLException {

            return new Statistics.BajgielStatistics(rs.getString("name"), rs.getInt("amount"));
        }

    }

    public static class DailyStatisticsRowMapper implements RowMapper<Statistics.DailyStatistics> {

        @Override
        public Statistics.DailyStatistics mapRow(ResultSet rs, int rowNum) throws SQLException {
            return new Statistics.DailyStatistics(rs.getString("date"),rs.getInt("amount"));
        }
    }
}