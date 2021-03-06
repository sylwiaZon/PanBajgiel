package com.repositories;

import com.models.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import java.util.ArrayList;
import java.util.List;

@Repository
public class ProductRepository {
    private JdbcTemplate jdbcTemplate;

    @Autowired
    public ProductRepository(JdbcTemplate jdbcTemplate) {

        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Product> getAllProductsFromDataBase(){
        String sql = "Select * from product";
        List<Product> productsFromDataBase = new ArrayList<Product>(jdbcTemplate.query(sql, new ProductRowMapper()));
        if(productsFromDataBase.isEmpty()){
            return null;
        }
        return productsFromDataBase;
    }

    public List<Product> getProduct(String productId){
        String sql = "Select * from product where id in ( "+ productId +")";
        List<Product> productsFromDataBase = new ArrayList<Product>(jdbcTemplate.query(sql, new ProductRowMapper()));
        if(productsFromDataBase.isEmpty()) {
            return null;
        }
        return productsFromDataBase;
    }

    public boolean addNewTransaction(Transaction transaction){
        var sql = String.format("INSERT INTO transaction(user_login,shop_id,date) VALUES ('%s', %d,'%s')",transaction.getUserLogin(), transaction.getShopId(),transaction.getDate());
        try {
            jdbcTemplate.execute(sql);
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }
        return true;
    }

    public boolean addNewTransactionDetails(List <Details> details){
        var sql = "INSERT INTO details(transaction_id,product_id,amount) VALUES  ";
        for (var detail: details){
            var detailString = String.format(" (%d,%d,%d),",detail.getTransactionId(),detail.getProductId(),detail.getAmount());
            sql += detailString;
        }
        sql = sql.substring(0,sql.length()-1);
        try
        {
            jdbcTemplate.execute(sql);
        } catch (Exception ex) {
            ex.printStackTrace();
            return false;
        }
        return true;
    }

    public Integer getLastTransactionId(){
        var sql = "SELECT  * from transaction ORDER BY id DESC LIMIT 1";
        List<Transaction> lastTransaction = jdbcTemplate.query(sql, new TransactionRowMapper());
        if(!lastTransaction.isEmpty()) {
            return lastTransaction.get(0).getId();
        } else {
            return 1;
        }
    }
}
