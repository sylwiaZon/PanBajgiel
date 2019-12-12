package tests.controllers;


import com.Controllers.ShopController;
import com.Models.Shop;
import com.Repositories.ShopRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import tests.helpers.ShopHelper;
import java.util.List;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

public class ShopControllerUnitTests {

    private MockMvc mockMvc;
    private ShopHelper shopHelper;

    @Mock
    private ShopRepository shopRepository;

    @InjectMocks
    private ShopController shopController;

    @Before
    public void init() {
        this.shopHelper = new ShopHelper();
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(shopController)
                .build();
    }

    @Test
    public void getShops_should_return_shops() throws Exception {
        List<Shop> shops = shopHelper.getShops();
        when(shopRepository.getAllShopsFromDataBase()).thenReturn(shops);
        ResponseEntity<List<Shop>> responseShops = shopController.getShops("all");
        ResponseEntity<List<Shop>> expectedResponse = new ResponseEntity<List<Shop>>(shops, HttpStatus.OK);
        assertEquals(responseShops, expectedResponse);
    }

    @Test
    public void getShops_with_id_should_return_shops() throws Exception {
        List<Shop> shops = shopHelper.getFirstShop();
        when(shopRepository.findShops("1")).thenReturn(shops);
        ResponseEntity<List<Shop>> responseShops = shopController.getShops("1");
        ResponseEntity<List<Shop>> expectedResponse = new ResponseEntity<List<Shop>>(shops, HttpStatus.OK);
        assertEquals(responseShops, expectedResponse);
    }

    @Test
    public void getShops_with_id_should_return_NOT_FOUND() throws Exception {
        when(shopRepository.findShops("3")).thenReturn(null);
        ResponseEntity<List<Shop>> responseProducts = shopController.getShops("3");
        ResponseEntity<List<Shop>> expectedResponse = new ResponseEntity<List<Shop>>(HttpStatus.NOT_FOUND);
        assertEquals(responseProducts, expectedResponse);
    }
    @Test
    public void getShops_should_return_NOT_FOUND() throws Exception {
        when(shopRepository.getAllShopsFromDataBase()).thenReturn(null);
        ResponseEntity<List<Shop>> responseShops = shopController.getShops("all");
        ResponseEntity<List<Shop>> expectedResponse = new ResponseEntity<List<Shop>>(HttpStatus.NOT_FOUND);
        assertEquals(responseShops, expectedResponse);
    }
}