package tests.controllers;

import com.models.Statistics;
import com.repositories.StatisticsRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import tests.helpers.StatisticsHelper;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

public class StatisticsControllerUnitTests {

    private StatisticsHelper statisticsHelper;

    @Mock
    private StatisticsRepository statisticsRepository;

    @InjectMocks
    private com.Controllers.StatisticsController statisticsController;

    @Before
    public void init() {
        this.statisticsHelper = new StatisticsHelper();
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void getShopsStatisticsShouldReturnListOfStatistics() throws Exception {
        List<Statistics.ShopsStatistics> statisticsList = statisticsHelper.shopsStatistics.getShopsStatistics();
        when(statisticsRepository.getTopShops()).thenReturn(statisticsList);
        ResponseEntity<List<Statistics.ShopsStatistics>> responseStatistics = statisticsController.getShopsStatistics();
        ResponseEntity<List<Statistics.ShopsStatistics>> expectedResponse = new ResponseEntity<List<Statistics.ShopsStatistics>>(statisticsList, HttpStatus.OK);
        assertEquals(responseStatistics, expectedResponse);
    }

    @Test
    public void getShopsStatisticsShouldReturnNOTFOUND() throws Exception {
        when(statisticsRepository.getTopShops()).thenReturn(null);
        ResponseEntity<List<Statistics.ShopsStatistics>> responseStatistics = statisticsController.getShopsStatistics();
        ResponseEntity<List<Statistics.ShopsStatistics>> expectedResponse = new ResponseEntity(HttpStatus.NOT_FOUND);
        assertEquals(responseStatistics, expectedResponse);
    }

    @Test
    public void getShopStatisticsShouldReturnStatistics() throws Exception {
        Statistics.ShopStatistics statistics = statisticsHelper.shopStatistics.getShopStatistics();
        int shopId = 1;
        when(statisticsRepository.getShopStatistics(shopId)).thenReturn(statistics);
        ResponseEntity<Statistics.ShopStatistics> responseStatistics = statisticsController.getShopStatistics(shopId);
        ResponseEntity<Statistics.ShopStatistics> expectedResponse = new ResponseEntity<Statistics.ShopStatistics>(statistics, HttpStatus.OK);
        assertEquals(responseStatistics, expectedResponse);
    }

    @Test
    public void getShopStatisticsShouldReturnNOTFOUND() throws Exception {
        int shopId = 1;
        when(statisticsRepository.getShopStatistics(shopId)).thenReturn(null);
        ResponseEntity<Statistics.ShopStatistics> responseStatistics = statisticsController.getShopStatistics(shopId);
        ResponseEntity<Statistics.ShopStatistics> expectedResponse = new ResponseEntity(HttpStatus.NOT_FOUND);
        assertEquals(responseStatistics, expectedResponse);
    }

    @Test
    public void getTopBajgielsStatisticsShouldReturnListOfStatistics() throws Exception {
        List<Statistics.BajgielStatistics> statistics = statisticsHelper.bajgielStatistics.getBajgielStatistics();
        when(statisticsRepository.getTopBajgiels()).thenReturn(statistics);
        ResponseEntity<List<Statistics.BajgielStatistics>> responseStatistics = statisticsController.getBajgielsStatistics();
        ResponseEntity<List<Statistics.BajgielStatistics>> expectedResponse = new ResponseEntity<List<Statistics.BajgielStatistics>>(statistics, HttpStatus.OK);
        assertEquals(responseStatistics, expectedResponse);
    }

    @Test
    public void getTopBajgielsStatisticsShouldReturnNOTFOUND() throws Exception {
        when(statisticsRepository.getTopBajgiels()).thenReturn(null);
        ResponseEntity<List<Statistics.BajgielStatistics>> responseStatistics = statisticsController.getBajgielsStatistics();
        ResponseEntity<List<Statistics.BajgielStatistics>> expectedResponse = new ResponseEntity(HttpStatus.NOT_FOUND);
        assertEquals(responseStatistics, expectedResponse);
    }
}
