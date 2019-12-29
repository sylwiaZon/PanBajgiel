package tests.helpers;

import com.models.Statistics;

import java.util.ArrayList;
import java.util.List;

public class StatisticsHelper {
    public ShopsStatistics shopsStatistics;
    public ShopStatistics shopStatistics;
    public BajgielStatistics bajgielStatistics;

    public StatisticsHelper() {
        this.shopsStatistics = new ShopsStatistics();
        this.shopStatistics = new ShopStatistics();
        this.bajgielStatistics = new BajgielStatistics();
    }

    public class ShopStatistics {
        private Statistics.ShopStatistics shopStatistics;

        public ShopStatistics() {
            List<Statistics.BajgielStatistics> bajgielStatisticsList = new ArrayList<>();
            Statistics.BajgielStatistics bajgielStatistics1 = new Statistics.BajgielStatistics("Prod1", 10);
            Statistics.BajgielStatistics bajgielStatistics2 = new Statistics.BajgielStatistics("Prod2", 5);
            bajgielStatisticsList.add(bajgielStatistics1);
            bajgielStatisticsList.add(bajgielStatistics2);
            shopStatistics = new Statistics.ShopStatistics(bajgielStatisticsList);
            shopStatistics.setShopName("Shop");
            shopStatistics.setProductsNumber(15);
        }

        public Statistics.ShopStatistics getShopStatistics() {
            return shopStatistics;
        }
    }

    public class BajgielStatistics {
        private List<Statistics.BajgielStatistics> bajgielStatistics;

        public BajgielStatistics() {
            Statistics.BajgielStatistics bajgielStatistics1 = new Statistics.BajgielStatistics("Prod1",10);
            Statistics.BajgielStatistics bajgielStatistics2 = new Statistics.BajgielStatistics("Prod2",15);
            bajgielStatistics = new ArrayList<>();
            bajgielStatistics.add(bajgielStatistics1);
            bajgielStatistics.add(bajgielStatistics2);
        }

        public List<Statistics.BajgielStatistics> getBajgielStatistics() {
            return bajgielStatistics;
        }
    }

    public class ShopsStatistics {
        private List<Statistics.ShopsStatistics> shopsStatistics;

        public ShopsStatistics() {
            shopsStatistics = new ArrayList<>();
            Statistics.ShopsStatistics shopsStatistics1 = new Statistics.ShopsStatistics("ShopName1", 10);
            Statistics.ShopsStatistics shopsStatistics2 = new Statistics.ShopsStatistics("ShopName2", 15);
            shopsStatistics.add(shopsStatistics1);
            shopsStatistics.add(shopsStatistics2);
        }

        public List<Statistics.ShopsStatistics> getShopsStatistics() {
            return shopsStatistics;
        }
    }


}
