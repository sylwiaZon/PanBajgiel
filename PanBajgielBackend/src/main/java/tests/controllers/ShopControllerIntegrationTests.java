package tests.controllers;

import com.Controllers.ShopController;
import com.models.Shop;
import com.repositories.ShopRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import tests.helpers.ShopHelper;

import java.util.List;

import static org.mockito.Mockito.*;
import static org.mockito.Mockito.verifyNoMoreInteractions;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

public class ShopControllerIntegrationTests {

    private ShopHelper shopHelper;
    private MockMvc mockMvc;

    @Mock
    private ShopRepository shopRepository;

    @InjectMocks
    private ShopController shopController;

    @Before
    public void init(){
        shopHelper = new ShopHelper();
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(shopController)
                .build();
    }

    @Test
    public void getShops_should_return_products() throws Exception {
        List<Shop> shops = shopHelper.getShops();
        when(shopRepository.getAllShopsFromDataBase()).thenReturn(shops);

        mockMvc.perform(get("/shop"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(shops.get(0).getId()))
                .andExpect(jsonPath("$[0].localization").value(shops.get(0).getLocalization()))
                .andExpect(jsonPath("$[0].address").value(shops.get(0).getAddress()))
                .andExpect(jsonPath("$[1].id").value(shops.get(1).getId()))
                .andExpect(jsonPath("$[1].localization").value(shops.get(1).getLocalization()))
                .andExpect(jsonPath("$[1].address").value(shops.get(1).getAddress())) ;

        verify(shopRepository, times(1)).getAllShopsFromDataBase();
        verifyNoMoreInteractions(shopRepository);
    }

    @Test
    public void getShops_with_id_should_return_shops() throws Exception {
        List<Shop> shops = shopHelper.getFirstShop();
        when(shopRepository.getShop("1")).thenReturn(shops);

        mockMvc.perform(get("/shop?id=1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(shops.get(0).getId()))
                .andExpect(jsonPath("$[0].localization").value(shops.get(0).getLocalization()))
                .andExpect(jsonPath("$[0].address").value(shops.get(0).getAddress()));

        verify(shopRepository, times(1)).getShop("1");
        verifyNoMoreInteractions(shopRepository);
    }

    @Test
    public void getShops_with_id_should_return_NOT_FOUND() throws Exception {
        List<Shop> shops = shopHelper.getFirstShop();
        when(shopRepository.getShop("1")).thenReturn(null);

        mockMvc.perform(get("/shop?id=1"))
                .andExpect(status().isNotFound());

        verify(shopRepository, times(1)).getShop("1");
        verifyNoMoreInteractions(shopRepository);
    }

    @Test
    public void getShops_should_return_NOT_FOUND() throws Exception {
        List<Shop> shops = shopHelper.getShops();
        when(shopRepository.getAllShopsFromDataBase()).thenReturn(null);

        mockMvc.perform(get("/shop"))
                .andExpect(status().isNotFound());

        verify(shopRepository, times(1)).getAllShopsFromDataBase();
        verifyNoMoreInteractions(shopRepository);
    }
}
