package com.Models;

public class Shop {
    private Integer id;
    private String localization;
    private String address;

    public Shop(Integer id, String localization, String address){
        this.id = id;
        this.localization = localization;
        this.address = address;
    }
    public Integer getId(){
        return this.id;
    }
    public String getLocalization(){
        return this.localization;
    }
    public  String getAddress(){
        return this.address;
    }
    public String toString() {
        return "[id: "+getId()+", localization: "+getLocalization() +", address: "+getAddress()+"]";
    }
}
