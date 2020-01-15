package com.controllers;

import com.models.Statistics;
import com.repositories.StatisticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/statistics")
public class StatisticsController {

    @Autowired
    private StatisticsRepository statisticsRepository;

    //Method to get statistics for all of the shops
    @RequestMapping(value = "/shops", method = RequestMethod.GET )
    public ResponseEntity<List<Statistics.ShopsStatistics>> getShopsStatistics() {
        List<Statistics.ShopsStatistics> statistics = statisticsRepository.getTopShops();
        if(statistics != null) {
            return new ResponseEntity(statistics, HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    //Method to get statistics for all of the products
    @RequestMapping(value = "/bajgiels", method = RequestMethod.GET )
    public ResponseEntity<List<Statistics.BajgielStatistics>> getBajgielsStatistics() {
        List<Statistics.BajgielStatistics> statistics = statisticsRepository.getTopBajgiels();
        if(statistics != null) {
            return new ResponseEntity(statistics, HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    //Method to get statistics for specific shop
    @RequestMapping(value = "/shop", method = RequestMethod.GET )
    public ResponseEntity<Statistics.ShopStatistics> getShopStatistics(@RequestParam("id") Integer id) {
        Statistics.ShopStatistics statistics = statisticsRepository.getShopStatistics(id);
        if(statistics != null) {
            return new ResponseEntity(statistics, HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }
}
