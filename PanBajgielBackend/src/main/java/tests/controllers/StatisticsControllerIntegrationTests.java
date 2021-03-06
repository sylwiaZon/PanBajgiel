package tests.controllers;

import com.models.Statistics;
import com.repositories.StatisticsRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import tests.helpers.StatisticsHelper;
import java.util.List;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class StatisticsControllerIntegrationTests {
    private StatisticsHelper statisticsHelper;
    private MockMvc mockMvc;

    @Mock
    private StatisticsRepository statisticsRepository;

    @InjectMocks
    private com.controllers.StatisticsController statisticsController;

    @Before
    public void init(){
        statisticsHelper = new StatisticsHelper();
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(statisticsController)
                .build();
    }

    @Test
    public void getShopsStatisticsShouldReturnListOfStatistics() throws Exception {
        List<Statistics.ShopsStatistics> statisticsList = statisticsHelper.shopsStatistics.getShopsStatistics();
        when(statisticsRepository.getTopShops()).thenReturn(statisticsList);
        mockMvc.perform(get("/statistics/shops").header("Origin","*"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].shopName").value("ShopName1"))
                .andExpect(jsonPath("$[0].productsNumber").value(10))
                .andExpect(jsonPath("$[1].shopName").value("ShopName2"))
                .andExpect(jsonPath("$[1].productsNumber").value(15));
        verify(statisticsRepository, times(1)).getTopShops();
        verifyNoMoreInteractions(statisticsRepository);
    }

    @Test
    public void getShopsStatisticsShouldReturnNOTFOUND() throws Exception {
        when(statisticsRepository.getTopShops()).thenReturn(null);
        mockMvc.perform(get("/statistics/shops").header("Origin","*"))
                .andExpect(status().isNotFound());
        verify(statisticsRepository, times(1)).getTopShops();
        verifyNoMoreInteractions(statisticsRepository);
    }

    @Test
    public void getShopStatisticsShouldReturnStatistics() throws Exception {
        Statistics.ShopStatistics statistics= statisticsHelper.shopStatistics.getShopStatistics();
        int shopId = 1;
        when(statisticsRepository.getShopStatistics(shopId)).thenReturn(statistics);
        mockMvc.perform(get("/statistics/shop?id=1").header("Origin","*"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$.shopName").value("Shop"))
                .andExpect(jsonPath("$.productsNumber").value(15))
                .andExpect(jsonPath("$.bajgielStatistics[0].bajgielName").value("Prod1"))
                .andExpect(jsonPath("$.bajgielStatistics[0].productsNumber").value(10));
        verify(statisticsRepository, times(1)).getShopStatistics(shopId);
        verifyNoMoreInteractions(statisticsRepository);
    }


    @Test
    public void getShopStatisticsShouldReturnNOTFOUND() throws Exception {
        int shopId = 1;
        when(statisticsRepository.getShopStatistics(shopId)).thenReturn(null);
        mockMvc.perform(get("/statistics/shop?id=1").header("Origin","*"))
                .andExpect(status().isNotFound());
        verify(statisticsRepository, times(1)).getShopStatistics(shopId);
        verifyNoMoreInteractions(statisticsRepository);
    }

    @Test
    public void getBajgielsStatisticsShouldReturnStatistics() throws Exception {
        List<Statistics.BajgielStatistics> statistics= statisticsHelper.bajgielStatistics.getBajgielStatistics();
        when(statisticsRepository.getTopBajgiels()).thenReturn(statistics);
        mockMvc.perform(get("/statistics/bajgiels").header("Origin","*"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].bajgielName").value("Prod1"))
                .andExpect(jsonPath("$[0].productsNumber").value(10))
                .andExpect(jsonPath("$[1].bajgielName").value("Prod2"))
                .andExpect(jsonPath("$[1].productsNumber").value(15));
        verify(statisticsRepository, times(1)).getTopBajgiels();
        verifyNoMoreInteractions(statisticsRepository);
    }

    @Test
    public void getBajgielsStatisticsShouldReturnNOTFOUND() throws Exception {
        when(statisticsRepository.getTopBajgiels()).thenReturn(null);
        mockMvc.perform(get("/statistics/bajgiels").header("Origin","*"))
                .andExpect(status().isNotFound());
        verify(statisticsRepository, times(1)).getTopBajgiels();
        verifyNoMoreInteractions(statisticsRepository);
    }
}