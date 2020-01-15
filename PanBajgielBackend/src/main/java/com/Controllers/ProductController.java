package com.controllers;

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

    //Method to get products either by id or all of them
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<Product>> getProducts(@RequestParam(value="id", defaultValue="all") String productId){
        List<Product> allProductsFromDataBase;
        if("all".equals(productId)){
            allProductsFromDataBase = productRepository.getAllProductsFromDataBase();
        }
        else{
            allProductsFromDataBase = productRepository.getProduct(productId);
        }
        if(allProductsFromDataBase == null){
            return new ResponseEntity(HttpStatus.NOT_FOUND);

        } else {
            return new ResponseEntity<List<Product>>(allProductsFromDataBase,HttpStatus.OK);
        }
    }

    //Method to add transactions
    @RequestMapping(value = "/transaction", method = RequestMethod.POST)
    public ResponseEntity<Object> addTransaction(@RequestBody Transaction transaction){
        boolean action = productRepository.addNewTransaction(transaction);
        if(action) {
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
    }

    //Method to add transaction details
    @RequestMapping(value = "/transactionDetails", method = RequestMethod.POST )
    public ResponseEntity<Object> addTransactionDetails(@RequestBody List<Details> details){
        Integer transactionId = productRepository.getLastTransactionId();
        for(var detail : details){
            detail.setTransactionId(transactionId);
        }
        boolean action = productRepository.addNewTransactionDetails(details);
        if(action) {
            return new ResponseEntity(HttpStatus.OK);
        } else {
            return new ResponseEntity(HttpStatus.CONFLICT);
        }
    }
}