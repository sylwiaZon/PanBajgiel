package com.repositories;

import com.models.Details;
import com.models.DetailsRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

public class DetailsRepository {
        private final JdbcTemplate jdbcTemplate;

        @Autowired
        public DetailsRepository(JdbcTemplate jdbcTemplate) {
            this.jdbcTemplate = jdbcTemplate;
        }

        public List<Details> getDetails(Integer transactionId) {
            String sql = "Select * from details where transaction_id = \"" + transactionId + " \";";
            return jdbcTemplate.query(sql, new DetailsRowMapper());
        }
}
