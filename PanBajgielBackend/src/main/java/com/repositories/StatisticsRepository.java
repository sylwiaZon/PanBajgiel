package com.repositories;

import com.models.Statistics;
import com.models.StatisticsRowMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
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
        SimpleDateFormat format = new SimpleDateFormat("yyy-MM-dd");
        String strDate = format.format(date);
        return strDate;
    }

    public List<Statistics.ShopStatistics> getTopShops() {
        String sql = "select s.address, sum(d.amount) as amount from transaction t inner join shop s on  t.shop_id = s.id \n" +
                "\tinner join details d on t.id = d.transaction_id where t.date > \"" + getDate() + "\" group by s.address order by amount desc limit 3;";
        List<Statistics.ShopStatistics> statistics = jdbcTemplate.query(sql, new StatisticsRowMapper.ShopStatisticsRowMapper());
        if (statistics.size() > 0) {
            return statistics;
        } else {
            return null;
        }
    }

    public List<Statistics.BajgielStatistics> getTopBajgiels() {
        String sql = "select p.name, sum(d.amount) as amount from transaction t inner join details d on t.id = d.transaction_id \n" +
                "\tinner join product p on p.id = d.product_id where t.date > \"" + getDate() + "\" group by p.name order by amount desc limit 3;";
        List<Statistics.BajgielStatistics> statistics = jdbcTemplate.query(sql, new StatisticsRowMapper.BajgielStatisticsRowMapper());
        if (statistics.size() > 0) {
            return statistics;
        } else {
            return null;
        }
    }
}
