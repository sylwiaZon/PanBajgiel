package com.Models;

public class Product {
    private Integer id;
    private String name;
    private Float price;

    public Product(Integer id, String name, Float price){
        this.id = id;
        this.name = name;
        this.price = price;
    }

    public Integer getId() {
        return id;
    }
    public String getName() {
        return name;
    }
    public Float getPrice(){
        return price;
    }
    public String toString() {
        return "[id: "+getId()+", name: "+getName() +", price: "+getPrice()+"]";
    }
}
