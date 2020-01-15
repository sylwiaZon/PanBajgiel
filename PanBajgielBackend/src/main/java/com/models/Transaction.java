package com.models;

public class Transaction {
    private Integer id;
    private String userLogin;
    private Integer shopId;
    private String date;

    public Transaction(){}

    public Transaction(Integer id, String login, Integer shopId, String date){
        this.id = id;
        this.userLogin = login;
        this.shopId = shopId;
        this.date = date;
    }

    public Integer getId() {
        return id;
    }

    public String getUserLogin() {
        return userLogin;
    }

    public Integer getShopId() {
        return shopId;
    }

    public String getDate() {
        return date;
    }
}
