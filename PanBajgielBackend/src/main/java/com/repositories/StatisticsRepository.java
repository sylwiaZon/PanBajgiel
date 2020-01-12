package com.repositories;

import com.models.Shop;
import com.models.ShopRowMapper;
import com.models.Statistics;
import com.models.StatisticsRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Repository
public class StatisticsRepository {
    private final JdbcTemplate jdbcTemplate;

    @Autowired
    public StatisticsRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private String getDate(){
        Calendar calendar = Calendar.getInstance();
        calendar.add(Calendar.DATE, -7);
        Date date = calendar.getTime();
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd");
        String strDate = format.format(date);
        return strDate;
    }

    public List<Statistics.ShopsStatistics> getTopShops() {
        String sql = "select s.address, sum(d.amount) as amount from transaction t inner join shop s on  t.shop_id = s.id \n" +
                "\tinner join details d on t.id = d.transaction_id where t.date > \"" + getDate() + "\" group by s.address order by amount desc limit 3;";
        List<Statistics.ShopsStatistics> statistics = jdbcTemplate.query(sql, new StatisticsRowMapper.ShopsStatisticsRowMapper());
        return statistics;
    }

    public List<Statistics.BajgielStatistics> getTopBajgiels() {
        String sql = "select p.name, sum(d.amount) as amount from transaction t inner join details d on t.id = d.transaction_id \n" +
                "\tinner join product p on p.id = d.product_id where t.date > \"" + getDate() + "\" group by p.name order by amount desc limit 3;";
        List<Statistics.BajgielStatistics> statistics = jdbcTemplate.query(sql, new StatisticsRowMapper.BajgielStatisticsRowMapper());
        return statistics;
    }

    private String getShopName(int shopId) {
        String sql = "Select * from shop where id = " + shopId + ";";
        List<Shop> shopsFromDataBase = new ArrayList<Shop>(jdbcTemplate.query(sql, new ShopRowMapper()));
        return shopsFromDataBase.get(0).getAddress();
    }

    private List<Statistics.DailyStatistics> getDailyStatistics(int shopId) {
        String sql = "select t.date, sum(d.amount) as amount from transaction t inner join details d on t.id = d.transaction_id  \n" +
                "inner join shop s on s.id = t.shop_id where t.date > \"" + getDate() + "\" and s.id = 1 group by t.date order by amount desc;";
        List<Statistics.DailyStatistics> dailyStatistics = new ArrayList<Statistics.DailyStatistics>(jdbcTemplate.query(sql, new StatisticsRowMapper.DailyStatisticsRowMapper()));
        return dailyStatistics;
    }

    public Statistics.ShopStatistics getShopStatistics (Integer shopId){
        String sql = "select p.name, sum(d.amount) as amount from transaction t inner join details d on t.id = d.transaction_id  inner join shop s on s.id = t.shop_id\n" +
                "inner join product p on p.id = d.product_id where t.date > \"" + getDate() + "\" and s.id = " + shopId + " group by p.name order by amount desc;";
        List<Statistics.BajgielStatistics> statistics = jdbcTemplate.query(sql, new StatisticsRowMapper.BajgielStatisticsRowMapper());
        Statistics.ShopStatistics shopStatistics  = new Statistics.ShopStatistics(statistics);
        if (statistics.size() > 0) {
            int num = 0;
            for (Statistics.BajgielStatistics bajgielStatistics: statistics){
                num += bajgielStatistics.getProductsNumber();
            }
            shopStatistics.setDailyStatistics(getDailyStatistics(shopId));
        } else {
            shopStatistics.setDailyStatistics(new ArrayList<>());
        }
        shopStatistics.setProductsNumber(0);
        shopStatistics.setShopName(getShopName(shopId));
        return shopStatistics;
    }
}
