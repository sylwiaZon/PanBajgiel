package com.Repositories;

import com.Models.Shop;
import java.util.ArrayList;
import java.util.List;

public class ShopList {
    private List<Shop> shops;

    public ShopList(){
        shops = new ArrayList<>();
    }
    public List<Shop> getShops(){
        return this.shops;
    }
    public void setShops( List<Shop> productsToCopy){
        shops.addAll(productsToCopy);
    }
}
