package com.models;

import java.util.ArrayList;
import java.util.List;

public class Statistics {

    public static class ShopsStatistics {
        String shopName;
        Integer productsNumber;

        public ShopsStatistics(String shopName, Integer productsNumber) {
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

        public BajgielStatistics(String bajgielName, Integer productsNumber) {
            this.bajgielName = bajgielName;
            this.productsNumber = productsNumber;
        }

        public String getBajgielName() {
            return bajgielName;
        }

        public Integer getProductsNumber() {
            return productsNumber;
        }
    }

    public static class ShopStatistics {
        String shopName;
        List<BajgielStatistics> bajgielStatistics;
        Integer productsNumber;

        public ShopStatistics(List<BajgielStatistics> bajgielStatistics) {
            this.bajgielStatistics = bajgielStatistics;
        }

        public void setShopName(String shopName) {
            this.shopName = shopName;
        }

        public void setProductsNumber(Integer productsNumber) {
            this.productsNumber = productsNumber;
        }

        public List<BajgielStatistics> getBajgielStatistics() {
            return bajgielStatistics;
        }

        public String getShopName() {
            return shopName;
        }

        public Integer getProductsNumber() {
            return productsNumber;
        }
    }
}
