package com.Controllers;
import com.Repositories.ShopList;
import com.Repositories.ShopRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/shop")
public class ShopController {
    @Autowired
    private JdbcTemplate jdbcTemplate;
    private ShopRepository shopRepository;

    ShopController(){
        this.shopRepository = new ShopRepository();
    }

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<ShopList> getShops(@RequestParam(value="id", defaultValue="all") String shopId){
        ShopList allShopsFromDataBase;
        if( shopId.equals("all")){
            allShopsFromDataBase = shopRepository.getAllShopsFromDataBase(jdbcTemplate);
        }
        else{
            allShopsFromDataBase = shopRepository.findShops(shopId,jdbcTemplate);
        }
        if(allShopsFromDataBase == null){
            return new ResponseEntity(HttpStatus.NOT_FOUND);

        } else {
            return new ResponseEntity<ShopList>(allShopsFromDataBase,HttpStatus.OK);
        }
    }
}