package tests.controllers;

import com.Controllers.ProductController;
import com.models.Product;
import com.models.Transaction;
import com.repositories.ProductRepository;
import org.codehaus.jackson.map.ObjectMapper;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import tests.helpers.ProductHelper;
import tests.helpers.TransactionHelper;

import java.util.List;
import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;


public class ProductControllerIntegrationTests {

    private ProductHelper productHelper;
    private TransactionHelper transactionHelper;
    private MockMvc mockMvc;

    @Mock
    private ProductRepository productRepository;


    @InjectMocks
    private ProductController productController;

    @Before
    public void init(){
        productHelper = new ProductHelper();
        transactionHelper = new TransactionHelper();
        MockitoAnnotations.initMocks(this);
        mockMvc = MockMvcBuilders
                .standaloneSetup(productController)
                .build();
    }

    @Test
    public void getProductsShouldReturnProducts() throws Exception {
        List<Product> products = productHelper.getProducts();
        when(productRepository.getAllProductsFromDataBase()).thenReturn(products);

        mockMvc.perform(get("/product"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(products.get(0).getId()))
                .andExpect(jsonPath("$[0].name").value(products.get(0).getName()))
                .andExpect(jsonPath("$[0].price").value(products.get(0).getPrice()))
                .andExpect(jsonPath("$[1].id").value(products.get(1).getId()))
                .andExpect(jsonPath("$[1].name").value(products.get(1).getName()))
                .andExpect(jsonPath("$[1].price").value(products.get(1).getPrice())) ;

        verify(productRepository, times(1)).getAllProductsFromDataBase();
        verifyNoMoreInteractions(productRepository);
    }

    @Test
    public void getProductsWithIdShouldReturnProducts() throws Exception {
        List<Product> products = productHelper.getFirstProduct();
        when(productRepository.getProduct("1")).thenReturn(products);

        mockMvc.perform(get("/product?id=1"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$[0].id").value(products.get(0).getId()))
                .andExpect(jsonPath("$[0].name").value(products.get(0).getName()))
                .andExpect(jsonPath("$[0].price").value(products.get(0).getPrice()));

        verify(productRepository, times(1)).getProduct("1");
        verifyNoMoreInteractions(productRepository);
    }

    @Test
    public void addTransactionShouldReturnOK() throws Exception {
        Transaction transaction = transactionHelper.getTransaction();
        when(productRepository.addNewTransaction(any())).thenReturn(true);
        mockMvc.perform(post("/product/transaction")
                .contentType(MediaType.APPLICATION_JSON)
                .content(new ObjectMapper().writeValueAsString(transaction))
                .header("Origin","*"))
                .andDo(print())
                .andExpect(status().isOk());
        verify(productRepository, times(1)).addNewTransaction(transaction);
        verifyNoMoreInteractions(productRepository);

    }



    @Test
    public void getProductsWithIdShouldReturnNOTFOUND() throws Exception {
        when(productRepository.getProduct("1")).thenReturn(null);

        mockMvc.perform(get("/product?id=1"))
                .andExpect(status().isNotFound());

        verify(productRepository, times(1)).getProduct("1");
        verifyNoMoreInteractions(productRepository);
    }

    @Test
    public void getProductsShouldReturnNOTFOUND() throws Exception {
        when(productRepository.getAllProductsFromDataBase()).thenReturn(null);

        mockMvc.perform(get("/product"))
                .andExpect(status().isNotFound());

        verify(productRepository, times(1)).getAllProductsFromDataBase();
        verifyNoMoreInteractions(productRepository);
    }


}