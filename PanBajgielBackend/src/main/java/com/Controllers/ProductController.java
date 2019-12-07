package com.Controllers;
import com.Repositories.ProductList;
import com.Repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    private ProductRepository productRepository;

    ProductController(){
        this.productRepository = new ProductRepository();
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<ProductList> getProducts(@RequestParam(value="id", defaultValue="all") String productId){
        ProductList allProductsFromDataBase;
        if(productId.equals("all")){
            allProductsFromDataBase = productRepository.getAllProductsFromDataBase(jdbcTemplate);
        }
        else{
            allProductsFromDataBase = productRepository.findProducts(productId,jdbcTemplate);
        }
        if(allProductsFromDataBase == null){
            return new ResponseEntity(HttpStatus.NOT_FOUND);

        } else {
            return new ResponseEntity<ProductList>(allProductsFromDataBase,HttpStatus.OK);
        }
    }
}