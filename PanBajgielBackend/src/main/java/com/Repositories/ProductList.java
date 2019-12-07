package com.Repositories;

import com.Models.Product;
import java.util.ArrayList;
import java.util.List;

public class ProductList {
    private List<Product> products;

    public ProductList(){
        products = new ArrayList<>();
    }
    public List<Product> getProducts(){
        return this.products;
    }
    public void setProducts( List<Product> productsToCopy){
        products.addAll(productsToCopy);
    }
}
