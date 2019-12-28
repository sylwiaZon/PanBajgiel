package com.models;

import java.util.ArrayList;
import java.util.List;

public class Statistics {

    public static class ShopStatistics {
        String shopName;
        Integer productsNumber;

        public ShopStatistics(String shopName, Integer productsNumber) {
            this.shopName = shopName;
            this.productsNumber = productsNumber;
        }

        public String getShopName() {
            return shopName;
        }

        public Integer getProductsNumber() {
            return productsNumber;
        }
    }

    public static class BajgielStatistics {
        String bajgielName;
        Integer productsNumber;

        public BajgielStatistics(String shopName, Integer productsNumber) {
            this.bajgielName = shopName;
            this.productsNumber = productsNumber;
        }

        public String getBajgielName() {
            return bajgielName;
        }

        public Integer getProductsNumber() {
            return productsNumber;
        }
    }
}
