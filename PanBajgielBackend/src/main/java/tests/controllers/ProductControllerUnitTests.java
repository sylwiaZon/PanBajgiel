package tests.controllers;
import com.controllers.ProductController;
import com.models.Details;
import com.models.Product;
import com.models.Transaction;
import com.repositories.ProductRepository;
import org.junit.Before;
import org.junit.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import tests.helpers.ProductHelper;
import tests.helpers.TransactionHelper;

import java.util.List;
import static org.junit.Assert.assertEquals;
import static org.mockito.Mockito.*;


public class ProductControllerUnitTests {

    private ProductHelper productHelper;
    private TransactionHelper transactionHelper;

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductController productController;

    @Before
    public void init() {
        this.productHelper = new ProductHelper();
        this.transactionHelper = new TransactionHelper();

        MockitoAnnotations.initMocks(this);
    }

    @Test
    public void getProductsShouldReturnProducts() throws Exception {
        List<Product> products = productHelper.getProducts();
        when(productRepository.getAllProductsFromDataBase()).thenReturn(products);
        ResponseEntity<List<Product>> responseProducts = productController.getProducts("all");
        ResponseEntity<List<Product>> expectedResponse = new ResponseEntity<List<Product>>(products, HttpStatus.OK);
        assertEquals(responseProducts, expectedResponse);
    }

    @Test
    public void getProductsWithIdShouldReturnProducts() throws Exception {
        List<Product> products = productHelper.getFirstProduct();
        when(productRepository.getProduct("1")).thenReturn(products);
        ResponseEntity<List<Product>> responseProducts = productController.getProducts("1");
        ResponseEntity<List<Product>> expectedResponse = new ResponseEntity<List<Product>>(products, HttpStatus.OK);
        assertEquals(responseProducts, expectedResponse);
    }

    @Test
    public void addTransactionShouldReturnOK() throws Exception {
        Transaction transaction = transactionHelper.getTransaction();
        when(productRepository.addNewTransaction(transaction)).thenReturn(true);
        ResponseEntity<Object> response = productController.addTransaction(transaction);
        ResponseEntity<Object> expectedResponse = new ResponseEntity<Object>(HttpStatus.OK);
        assertEquals(response, expectedResponse);
    }

    @Test
    public void addTransactionDetailsShouldReturnOK() throws Exception {
        List<Details> details= transactionHelper.getDetails();
        when(productRepository.addNewTransactionDetails(details)).thenReturn(true);
        ResponseEntity<Object> response = productController.addTransactionDetails(details);
        ResponseEntity<Object> expectedResponse = new ResponseEntity<Object>(HttpStatus.OK);
        assertEquals(response, expectedResponse);
    }

    @Test
    public void getProductsWithIdShouldReturnNOTFOUND() throws Exception {
        when(productRepository.getProduct("3")).thenReturn(null);
        ResponseEntity<List<Product>> responseProducts = productController.getProducts("3");
        ResponseEntity<List<Product>> expectedResponse = new ResponseEntity<List<Product>>(HttpStatus.NOT_FOUND);
        assertEquals(responseProducts, expectedResponse);
    }
    @Test
    public void getProductsShouldReturnNOTFOUND() throws Exception {
        when(productRepository.getAllProductsFromDataBase()).thenReturn(null);
        ResponseEntity<List<Product>> responseProducts = productController.getProducts("all");
        ResponseEntity<List<Product>> expectedResponse = new ResponseEntity<List<Product>>(HttpStatus.NOT_FOUND);
        assertEquals(responseProducts, expectedResponse);
    }

    @Test
    public void addTransactionShouldReturnCONFLICT() throws Exception {
        Transaction transaction = transactionHelper.getTransaction();
        when(productRepository.addNewTransaction(transaction)).thenReturn(false);
        ResponseEntity<Object> response = productController.addTransaction(transaction);
        ResponseEntity<Object> expectedResponse = new ResponseEntity<Object>(HttpStatus.CONFLICT);
        assertEquals(response, expectedResponse);
    }

    @Test
    public void addTransactionDetailsShouldReturnCONFLICT() throws Exception {
        List<Details> details= transactionHelper.getDetails();
        when(productRepository.addNewTransactionDetails(details)).thenReturn(false);
        ResponseEntity<Object> response = productController.addTransactionDetails(details);
        ResponseEntity<Object> expectedResponse = new ResponseEntity<Object>(HttpStatus.CONFLICT);
        assertEquals(response, expectedResponse);
    }

}