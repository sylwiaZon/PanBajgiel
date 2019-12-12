package tests.helpers;

import com.Models.Product;
import com.Models.Shop;

import java.util.ArrayList;
import java.util.List;

public class ShopHelper {
    private List<Shop> responseShops;

    public ShopHelper() {
        Integer id =  1;
        String address = "Biblioteka Glowna";
        String localization =  "55.324, 34,545";
        Integer id2 =  2;
        String address2 = "Pod Centrum Energetyki";
        String localization2=  "52.324, 33,545";

        Shop shop1 = new Shop(id,localization,address);
        Shop shop2 = new Shop(id2,localization2,address2);
        this.responseShops = new ArrayList<Shop>();
        this.responseShops.add(shop1);
        this.responseShops.add(shop2);
    }

    public List<Shop> getShops(){
        return this.responseShops;
    }

    public List<Shop> getFirstShop(){
        return this.responseShops.subList(0,1);
    }


}
