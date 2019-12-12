package com.Controllers;

import com.Models.Product;
import java.util.List;
import com.Repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/product")
public class ProductController {
    @Autowired
    private ProductRepository productRepository;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<Product>> getProducts(@RequestParam(value="id", defaultValue="all") String productId){
        List<Product> allProductsFromDataBase;
        if(productId.equals("all")){
            allProductsFromDataBase = productRepository.getAllProductsFromDataBase();
        }
        else{
            allProductsFromDataBase = productRepository.findProducts(productId);
        }
        if(allProductsFromDataBase == null){
            return new ResponseEntity(HttpStatus.NOT_FOUND);

        } else {
            return new ResponseEntity<List<Product>>(allProductsFromDataBase,HttpStatus.OK);
        }
    }
}