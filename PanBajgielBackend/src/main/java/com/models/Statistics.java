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

    public static class DailyStatistics {
        String date;
        Integer productsNumber;

        public DailyStatistics(String date, Integer productsNumber) {
            this.date = date;
            this.productsNumber = productsNumber;
        }

        public String getDate() {
            return date;
        }

        public Integer getProductsNumber() {
            return productsNumber;
        }
    }

    public static class ShopStatistics {
        String shopName;
        List<BajgielStatistics> bajgielStatistics;
        Integer productsNumber;
        List<DailyStatistics> dailyStatistics;

        public ShopStatistics(List<BajgielStatistics> bajgielStatistics) {
            this.bajgielStatistics = bajgielStatistics;
        }

        public void setDailyStatistics(List<DailyStatistics> dailyStatistics) {
            this.dailyStatistics = dailyStatistics;
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

        public List<DailyStatistics> getDailyStatistics() {
            return dailyStatistics;
        }

        public String getShopName() {
            return shopName;
        }

        public Integer getProductsNumber() {
            return productsNumber;
        }
    }
}
