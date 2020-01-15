package com.models;

public class Details {
    private Integer transactionId;
    private Integer productId;
    private Integer amount;

    public Details(){}

    public Details(Integer transactionId, Integer productId, Integer amount){
        this.transactionId=transactionId;
        this.productId=productId;
        this.amount=amount;

    }
    public Details(Integer productId, Integer amount){
        this.productId=productId;
        this.amount=amount;
    }

    public Integer getTransactionId() {
        return transactionId;
    }

    public Integer getProductId() {
        return productId;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setTransactionId(Integer transactionId){
        this.transactionId=transactionId;
    }
}
