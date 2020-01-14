package tests.controllers;


import com.Controllers.ShopController;
import com.models.Shop;
import com.repositories.ShopRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import tests.helpers.ShopHelper;
import java.util.List;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.when;

public class ShopControllerUnitTests {

    private ShopHelper shopHelper;

    @Mock
    private ShopRepository shopRepository;

    @InjectMocks
    private ShopController shopController;

    @Before
    public void init() {
        this.shopHelper = new ShopHelper();
        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void getShopsShouldReturnShops() throws Exception {
        List<Shop> shops = shopHelper.getShops();
        when(shopRepository.getAllShopsFromDataBase()).thenReturn(shops);
        ResponseEntity<List<Shop>> responseShops = shopController.getShops("all");
        ResponseEntity<List<Shop>> expectedResponse = new ResponseEntity<List<Shop>>(shops, HttpStatus.OK);
        assertEquals(responseShops, expectedResponse);
    }

    @Test
    public void getShopsWithIdShouldReturnShops() throws Exception {
        List<Shop> shops = shopHelper.getFirstShop();
        when(shopRepository.getShop("1")).thenReturn(shops);
        ResponseEntity<List<Shop>> responseShops = shopController.getShops("1");
        ResponseEntity<List<Shop>> expectedResponse = new ResponseEntity<List<Shop>>(shops, HttpStatus.OK);
        assertEquals(responseShops, expectedResponse);
    }

    @Test
    public void getShopsWithIdShouldReturnNOTFOUND() throws Exception {
        when(shopRepository.getShop("3")).thenReturn(null);
        ResponseEntity<List<Shop>> responseProducts = shopController.getShops("3");
        ResponseEntity<List<Shop>> expectedResponse = new ResponseEntity<List<Shop>>(HttpStatus.NOT_FOUND);
        assertEquals(responseProducts, expectedResponse);
    }
    @Test
    public void getShopsShouldReturnNOTFOUND() throws Exception {
        when(shopRepository.getAllShopsFromDataBase()).thenReturn(null);
        ResponseEntity<List<Shop>> responseShops = shopController.getShops("all");
        ResponseEntity<List<Shop>> expectedResponse = new ResponseEntity<List<Shop>>(HttpStatus.NOT_FOUND);
        assertEquals(responseShops, expectedResponse);
    }
}