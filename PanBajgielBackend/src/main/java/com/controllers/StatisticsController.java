package com.controllers;

import com.models.Statistics;
import com.repositories.StatisticsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/statistics")
public class StatisticsController {

    @Autowired
    private StatisticsRepository statisticsRepository;

    @RequestMapping(value = "/shops", method = RequestMethod.GET )
    public ResponseEntity<List<Statistics.ShopStatistics>> getShopsStatistics() {
        List<Statistics.ShopStatistics> statistics = statisticsRepository.getTopShops();
        if(statistics.size() > 0) {
            return new ResponseEntity(statistics, HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/bajgiels", method = RequestMethod.GET )
    public ResponseEntity<List<Statistics.BajgielStatistics>> getBajgielsStatistics() {
        List<Statistics.BajgielStatistics> statistics = statisticsRepository.getTopBajgiels();
        if(statistics.size() > 0) {
            return new ResponseEntity(statistics, HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }
}
