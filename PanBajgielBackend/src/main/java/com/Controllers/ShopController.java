package com.controllers;
import com.models.Shop;
import com.repositories.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;


@RestController
@RequestMapping("/shop")
public class ShopController {
    @Autowired
    private ShopRepository shopRepository;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<List<Shop>> getShops(@RequestParam(value="id", defaultValue="all") String shopId){
        List<Shop> allShopsFromDataBase;
        if( "all".equals(shopId)){
            allShopsFromDataBase = shopRepository.getAllShopsFromDataBase();
        }
        else{
            allShopsFromDataBase = shopRepository.getShop(shopId);
        }
        if(allShopsFromDataBase == null){
            return new ResponseEntity(HttpStatus.NOT_FOUND);

        } else {
            return new ResponseEntity<List<Shop>>(allShopsFromDataBase,HttpStatus.OK);
        }
    }
}