package tests.controllers;
import com.Controllers.ProductController;
import com.models.Product;
import com.repositories.ProductRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import tests.helpers.ProductHelper;
import java.util.List;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;


public class ProductControllerUnitTests {

    private MockMvc mockMvc;
    private ProductHelper productHelper;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductController productController;

    @Before
    public void init() {
        this.productHelper = new ProductHelper();
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(productController)
                .build();
    }

    @Test
    public void getProducts_should_return_products() throws Exception {
        List<Product> products = productHelper.getProducts();
        when(productRepository.getAllProductsFromDataBase()).thenReturn(products);
        ResponseEntity<List<Product>> responseProducts = productController.getProducts("all");
        ResponseEntity<List<Product>> expectedResponse = new ResponseEntity<List<Product>>(products, HttpStatus.OK);
        assertEquals(responseProducts, expectedResponse);
    }

    @Test
    public void getProducts_with_id_should_return_products() throws Exception {
        List<Product> products = productHelper.getFirstProduct();
        when(productRepository.findProducts("1")).thenReturn(products);
        ResponseEntity<List<Product>> responseProducts = productController.getProducts("1");
        ResponseEntity<List<Product>> expectedResponse = new ResponseEntity<List<Product>>(products, HttpStatus.OK);
        assertEquals(responseProducts, expectedResponse);
    }

    @Test
    public void getProducts_with_id_should_return_NOT_FOUND() throws Exception {
        when(productRepository.findProducts("3")).thenReturn(null);
        ResponseEntity<List<Product>> responseProducts = productController.getProducts("3");
        ResponseEntity<List<Product>> expectedResponse = new ResponseEntity<List<Product>>(HttpStatus.NOT_FOUND);
        assertEquals(responseProducts, expectedResponse);
    }
    @Test
    public void getProducts_should_return_NOT_FOUND() throws Exception {
        when(productRepository.getAllProductsFromDataBase()).thenReturn(null);
        ResponseEntity<List<Product>> responseProducts = productController.getProducts("all");
        ResponseEntity<List<Product>> expectedResponse = new ResponseEntity<List<Product>>(HttpStatus.NOT_FOUND);
        assertEquals(responseProducts, expectedResponse);
    }
}