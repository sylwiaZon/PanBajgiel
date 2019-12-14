package tests.helpers;

import com.models.Product;
import java.util.ArrayList;
import java.util.List;

public class ProductHelper {
    private List<Product> responseProducts;

    public ProductHelper() {
        Integer id =  1;
        String name = "Z czekolada";
        Float price =  1.6f;
        Integer id2 =  2;
        String name2 = "Z chia";
        Float price2 =  2.1f;

        Product product1 = new Product(id,name,price);
        Product product2 = new Product(id2,name2,price2);
        this.responseProducts = new ArrayList<Product>();
        this.responseProducts.add(product1);
        this.responseProducts.add(product2);
    }

    public List<Product> getProducts(){
        return this.responseProducts;
    }

    public List<Product> getFirstProduct(){
        return this.responseProducts.subList(0,1);
    }

}