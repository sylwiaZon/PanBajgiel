package tests.helpers;

import com.models.Details;
import com.models.Transaction;

import java.util.ArrayList;
import java.util.List;

public class TransactionHelper {
    private List<Details> details = new ArrayList<>();
    private Transaction transaction;
        public TransactionHelper(){
            Details detail1 = new Details(1,1,1);
            Details detail2 = new Details(1,2,2);
            Details detail3 = new Details(1,3,4);
            this.details.add(detail1);
            this.details.add(detail2);
            this.details.add(detail3);
            this.transaction = new Transaction(1,"user",1,"01/01/2010");
        }

        public Transaction getTransaction(){return this.transaction;}
        public List<Details> getDetails(){return this.details;}

}