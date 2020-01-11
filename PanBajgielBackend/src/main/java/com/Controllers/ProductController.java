package com.Controllers;

import com.models.Details;
import com.models.Product;
import java.util.List;

import com.models.Transaction;
import com.repositories.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @RequestMapping(value = "/transaction", method = RequestMethod.POST)
    public ResponseEntity<Object> addTransaction(@RequestBody Transaction transcaction){
        boolean action = productRepository.addNewTransaction(transcaction);
        if(action) {
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }

    @RequestMapping(value = "/transaction_details", method = RequestMethod.POST )
    public ResponseEntity<Object> addTransactionDetails(@RequestBody List<Details> details){
        Integer transactionId = productRepository.getLastTranscatonId();
        for(var detail : details){
            detail.setTransactionId(transactionId);
        }
        boolean action = productRepository.addNewTransactionDetails(details);
        if(action) {
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }
    }
}