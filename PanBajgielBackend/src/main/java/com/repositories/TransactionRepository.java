package com.repositories;

import com.models.Transaction;
import com.models.TransactionRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class TransactionRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public TransactionRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Transaction> getTransactions() {
        String sql = "Select * from transaction;";
        List<Transaction> transactions = jdbcTemplate.query(sql, new TransactionRowMapper());
        if (transactions.size() > 0) {
            return transactions;
        } else {
            return null;
        }
    }
}