import React, { useState, useEffect } from 'react';

import { StyleSheet, Text, View, Picker,ScrollView, Dimensions } from 'react-native';
import { VictoryPie,VictoryLegend, VictoryLabel,VictoryBar ,VictoryChart, VictoryTheme, VictoryAxis} from 'victory-native';

var {width, height} = Dimensions.get('window');
const graphicColor = ['#ffbb68', '#952270', '#ff44b9','#00abd8','#66e200','#81a100'];
function formatDate(date){

    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();
    if(dd<10) {dd='0'+dd}
    if(mm<10) {mm='0'+mm}
    date = yyyy+'-'+mm+'-'+dd;
    return date
 }
 function Last7Days () { //z dzisiaj
    var result = ['','','','','','',''];
    for (var i=0; i<7; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        result[6-i]= formatDate(d)
    }

    return(result);
}
lastDays=Last7Days()

shop=[{x:lastDays[0], y:0},{x:lastDays[1],y:0},{x:lastDays[2],y:0},{x:lastDays[3],y:0},{x:lastDays[4],y:0},{x:lastDays[5],y:0},{x:lastDays[6],y:0}];


export class ShopStatistics extends React.Component {  
	
	constructor() {
    super();

   this.state = {
    
    shops: [], // sklepy pobrac z baz	
    current:'none',		// statystyki wyswietlane dla tego sklepu
    days:shop,	// ile w kolejnych dniach  , pobrac z bazy
    graphicData: [], //
    shopResponse: {"shopName":"przed C3","bajgielStatistics":[],"productsNumber":0,"dailyStatistics":[]},
    };
  }

 componentDidMount = () => {
   url = 'http://'+global.ip+':8081/shop'
  
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



}


 formatDate(date){

    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();
    if(dd<10) {dd='0'+dd}
    if(mm<10) {mm='0'+mm}
    date = yyyy+'-'+mm+'-'+dd;
    return date
 }
 Last7Days () { //z dzisiaj
    var result = ['','','','','','',''];
    for (var i=0; i<7; i++) {
        var d = new Date();
        d.setDate(d.getDate() - i);
        result[6-i]= this.formatDate(d)
    }

    return(result);
}
getStatistics(){
	this.createGraphicData();
	this.createChart();
}
createGraphicData(){
	console.log('AAAAAAAAAA!!!!');
	var wantedData=[];
	bajgle = this.state.shopResponse.bajgielStatistics;
	for( i =0; i<bajgle.length;i++){
		var n = i+1;
		wantedData.push({x:n, y: bajgle[i].productsNumber, label: bajgle[i].bajgielName});

	}
	this.state.graphicData = wantedData;
}

  getShops(){
  	this.getStatistics()

  	return this.state.shops.map((item,index) => {
		 

      return ( 
        

          <Picker.Item label={item.address} value={item.id} />

      )
    })
  }

  createChart(){

lastDays=Last7Days();

shop=[{x:lastDays[0], y:0},{x:lastDays[1],y:0},{x:lastDays[2],y:0},{x:lastDays[3],y:0},{x:lastDays[4],y:0},{x:lastDays[5],y:0},{x:lastDays[6],y:0}];
	daily=this.state.shopResponse.dailyStatistics;
	for(i=0;i<daily.length;i++){
		j = lastDays.findIndex(function(element){return element==daily[i].date});
		shop[j]={x:lastDays[j], y:daily[i].productsNumber}

	}
	

	this.state.days = shop;

  }

  updateDatas(itemValue,index){
  	this.setState({current: itemValue})
  	
 if(itemValue!='none'){

  		url2 = 'http://'+global.ip+':8081/statistics/shop?id='+itemValue;

  	fetch(url2, {
		      method: "GET"
		    })
		    .then((response) =>response.json())
		    .then((responseJson2) => {
		    	if(responseJson2!=undefined)
		         this.setState({
		        		         	shopResponse: responseJson2
		        		         }) 
		     	else
		     		this.setState({
		    		 shopResponse: {"shopName":"przed C3","bajgielStatistics":[{"bajgielName":"","productsNumber":1}],"productsNumber":0,"dailyStatistics":[{"date":"2019-12-30","productsNumber":0}]},
  
		    	});
		      })
		      
		    .catch((error) => {
		    	console.log("blad dla: "+itemValue)
		         console.error(error)
		      })
		    .done(()=>  this.getStatistics())

		 }  
	



  }

  render() {
  return (
  <ScrollView style={{width:width}}>
    <View style={styles.container}>
 	  <View style={styles.picker}>
 	  <Text style={styles.title2}>Wybierz sklep:</Text>
    <Picker
	  selectedValue={this.state.current}
	 	style={{width:width*0.5}}
	 	 itemStyle={{textAlign: 'center'}}
	  onValueChange={(itemValue, itemIndex) =>
	    
	    this.updateDatas(itemValue,itemIndex)
	  }>
	    <Picker.Item label="wybierz Sklep" value='none' />
	  {this.getShops()}
	</Picker>
	</View>
	<Text style={styles.title}>Sprzedaż bajgli w ciągu ostatnich 7 dni </Text>
	<View style={styles.chart}>
<VictoryChart 
  width={0.8*width}
  height={0.5*width}
domainPadding={width*0.025}
>
 <VictoryAxis crossAxis
 style={{
          tickLabels: {fontSize: 15, padding: 15 , width: 60},
          grid: { stroke: "#818e99", strokeWidth: 0.5 },
        }}
       
        standalone={false}
       
 />
 <VictoryAxis
 dependentAxis
 crossAxis

 style={{
          tickLabels: {fontSize: 15, padding: 15 , width: 60},
          grid: { stroke: "#818e99", strokeWidth: 0.5 },
        }}
  
         standalone={false}

 />
	<VictoryBar
    style={{ data: { fill: "#d53e36", width:width*0.05}, }}
     
     animate={{
  duration: 2000,
}}
    data={this.state.days}
  />
 
  </VictoryChart>
	</View>
	<View style={styles.pieChart}>
      <VictoryPie
        animate={{ duration: 2000, easing: "bounce" }}
        data={this.state.graphicData}
        radius={width*0.2}
        colorScale={graphicColor}
        innerRadius={width*0.1}
        width={width*0.8}
        height={width*0.5}
        
        
        style={{labels:{ fill: "black", fontSize: width*0.03, }, }}
      />



      </View>
      </View>
    </ScrollView>
  );
}
}

const styles = StyleSheet.create({
  container: {
  marginTop:150,
 alignItems: 'center',
justifyContent: 'center',
marginBottom:150,
  },
  title:{
  	fontSize:width*0.04,
  	fontWeight:'bold',
  	margin:20
  	
  },
  title2:{
  	fontSize:width*0.04,
  },
  pieChart:{
  	flexDirection:'column',
  	 alignItems: 'center',
justifyContent: 'center',
	
	marginTop:20,
	paddingTop:20,
	marginBottom:150,
	backgroundColor:'rgba(255,255,255,0.5)',

  },
  picker:{
 alignItems: 'center',
justifyContent: 'center',
  },
  chart:{
  	flexDirection:'column',
  	 alignItems: 'center',
justifyContent: 'center',
 
  	backgroundColor:'rgba(255,255,255,0.5)',
 
  }
});
