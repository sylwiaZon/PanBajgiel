package tests.controllers;

import com.models.Statistics;
import com.models.User;
import com.repositories.StatisticsRepository;
import com.repositories.UserRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import tests.helpers.StatisticsHelper;
import tests.helpers.UserHelper;

import java.util.List;

import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

public class StatisticsControllerUnitTests {

    private MockMvc mockMvc;
    private StatisticsHelper statisticsHelper;

    @Mock
    private StatisticsRepository statisticsRepository;

    @InjectMocks
    private com.controllers.StatisticsController statisticsController;

    @Before
    public void init() {
        this.statisticsHelper = new StatisticsHelper();
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(statisticsController)
                .build();
    }

    @Test
    public void get_shops_statistics_should_return_list_of_statistics() throws Exception {
        List<Statistics.ShopsStatistics> statisticsList = statisticsHelper.shopsStatistics.getShopsStatistics();
        when(statisticsRepository.getTopShops()).thenReturn(statisticsList);
        ResponseEntity<List<Statistics.ShopsStatistics>> responseStatistics = statisticsController.getShopsStatistics();
        ResponseEntity<List<Statistics.ShopsStatistics>> expectedResponse = new ResponseEntity<List<Statistics.ShopsStatistics>>(statisticsList, HttpStatus.OK);
        assertEquals(responseStatistics, expectedResponse);
    }

    @Test
    public void get_shops_statistics_should_return_NOT_FOUND() throws Exception {
        when(statisticsRepository.getTopShops()).thenReturn(null);
        ResponseEntity<List<Statistics.ShopsStatistics>> responseStatistics = statisticsController.getShopsStatistics();
        ResponseEntity<List<Statistics.ShopsStatistics>> expectedResponse = new ResponseEntity(HttpStatus.NOT_FOUND);
        assertEquals(responseStatistics, expectedResponse);
    }

    @Test
    public void get_shop_statistics_should_return_statistics() throws Exception {
        Statistics.ShopStatistics statistics = statisticsHelper.shopStatistics.getShopStatistics();
        int shopId = 1;
        when(statisticsRepository.getShopStatistics(shopId)).thenReturn(statistics);
        ResponseEntity<Statistics.ShopStatistics> responseStatistics = statisticsController.getShopStatistics(shopId);
        ResponseEntity<Statistics.ShopStatistics> expectedResponse = new ResponseEntity<Statistics.ShopStatistics>(statistics, HttpStatus.OK);
        assertEquals(responseStatistics, expectedResponse);
    }

    @Test
    public void get_shop_statistics_should_return_NOT_FOUND() throws Exception {
        int shopId = 1;
        when(statisticsRepository.getShopStatistics(shopId)).thenReturn(null);
        ResponseEntity<Statistics.ShopStatistics> responseStatistics = statisticsController.getShopStatistics(shopId);
        ResponseEntity<Statistics.ShopStatistics> expectedResponse = new ResponseEntity(HttpStatus.NOT_FOUND);
        assertEquals(responseStatistics, expectedResponse);
    }

    @Test
    public void get_top_bajgiels_statistics_should_return_list_of_statistics() throws Exception {
        List<Statistics.BajgielStatistics> statistics = statisticsHelper.bajgielStatistics.getBajgielStatistics();
        when(statisticsRepository.getTopBajgiels()).thenReturn(statistics);
        ResponseEntity<List<Statistics.BajgielStatistics>> responseStatistics = statisticsController.getBajgielsStatistics();
        ResponseEntity<List<Statistics.BajgielStatistics>> expectedResponse = new ResponseEntity<List<Statistics.BajgielStatistics>>(statistics, HttpStatus.OK);
        assertEquals(responseStatistics, expectedResponse);
    }

    @Test
    public void get_top_bajgiels_statistics_should_return_NOT_FOUND() throws Exception {
        when(statisticsRepository.getTopBajgiels()).thenReturn(null);
        ResponseEntity<List<Statistics.BajgielStatistics>> responseStatistics = statisticsController.getBajgielsStatistics();
        ResponseEntity<List<Statistics.BajgielStatistics>> expectedResponse = new ResponseEntity(HttpStatus.NOT_FOUND);
        assertEquals(responseStatistics, expectedResponse);
    }
}
