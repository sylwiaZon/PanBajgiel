import React from 'react';

import { StyleSheet, Text, View,Dimensions, ScrollView } from 'react-native';
var {width, height} = Dimensions.get('window');

//widok statystyk ogólnych
export class MainStatistics extends React.Component {

constructor() {
    super();

   this.state = {
    
    shops: [],
    products: [],
    };
  }
  
  //pobranie statystyk 'top sklep' oraz 'top bajgiel' 
  componentDidMount = () => {
   url = 'http://'+global.ip+':8081/statistics/shops'
   url2 = 'http://'+global.ip+':8081/statistics/bajgiels'


   //top sklep
  fetch(url, {
      method: "GET"
    })
    .then((response) => response.json())
    .then((responseJson) => {
         console.log(responseJson);
         this.setState({
            shops: responseJson
         })
      })
      
    .catch((error) => {
         console.error(error)
      })
    .done()

    //top bajgiel
     fetch(url2, {
      method: "GET"
    })
    .then((response) => response.json())
    .then((responseJson2) => {
         console.log(responseJson2);
         this.setState({
            products: responseJson2
         })
      })
      
    .catch((error) => {
         console.error(error)
      })
    .done()
}

  //funckja wypisująca pobrane top sklepy
  getTopShops(){
  	return this.state.shops.map((item,index) => {
      return ( 

         <Text style={styles.rank}>{index +1}. {item.shopName} - ilość transakcji: {item.productsNumber}</Text>

      )
    })
  }

  //funkcja wypisująca pobrane top bajgle
  getTopProducts(){
  	return this.state.products.map((item,index) => {
  	
      return ( 
        

         <Text style={styles.rank}>{index +1}. {item.bajgielName} - ilość sprzedanych: {item.productsNumber}</Text>

      )
    })
  }

  render() {
  return (
  <ScrollView>
    <View style={styles.container}>
 	  <Text style={styles.title}>
 	  	Rankingi z ostatnich 7 dni
 	  </Text>
 	  <View style={styles.ranking}>
      <Text style={styles.title2}>
      	Najpopularniejszych sklepy:
      </Text>
      	{this.getTopShops()}
      	<Text style={styles.title2}>
         Najchętniej kupowane bajgle:

      </Text>
       {this.getTopProducts()}
       </View>
    </View>
    </ScrollView>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  	justifyContent: 'center',
    

  },
  ranking:{
  	backgroundColor:'rgba(255,255,255,0.5)',
  	padding:20,
  	 alignItems: 'center',
  	 justifyContent: 'center',
  	 marginTop:50,
  	 width:0.8*width,
  },
  title:{
  	fontSize:width*0.05,
  	fontWeight:'bold',
    marginTop: 150,
  	
  },
  title2: {
  	fontSize: width*0.04,
  	fontWeight: 'bold',
  	margin: 20,
  	
  },
  rank:{
  	fontSize: width*0.03,
  	margin: 10,

  }
});
