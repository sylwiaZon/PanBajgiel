import { StyleSheet, Text, View, Image, ScrollView, AppRegistry,  Animated,TouchableOpacity, Alert } from 'react-native';
import React,{Component} from 'react';
import {Dimensions, Button } from "react-native";
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import QRCode from 'react-native-qrcode-svg';
import {UserModel} from "./userModel.js";


var {width, height} = Dimensions.get('window');

//widok i obsługa pobrania promocji
export class Promotions extends Component {


constructor() {
    super();

   this.state = {
    login: global.login,
    promotions: [],
    point:'',
    qrValue:''
    };

  }
componentDidMount = () => { // pobranie danych o użytkowniku
   url = 'http://'+global.ip+':8081/user?login='+this.state.login

  fetch(url, {
      method: "GET"
    })
    .then((response) => response.json())
    .then((responseJson) => {
         console.log(responseJson);
         this.setState({
            point: responseJson
         })
      })
      
    .catch((error) => {
         console.error(error)
      })
    
}

getPromotions(){ // pobranie promocji
      
    return this.state.promotions.map((item,index) => {
       
      return ( 
        <View style={styles.rowContainer}>
        <View style={styles.insideContainer}>
         <Image  source={require('./assets/Mak.png')} style={styles.img}/>

         <Text style={styles.text}> Promocja {item} %</Text>
        </View>
    <View style={styles.insideContainer2}>
     <TouchableOpacity onPress={() => {this.setState({ visible: true, qrValue: item});}}>
              <View style={{width:width*0.5, textAlign:'center', alignItems:'center', justifyContent:'center'}}>
             <Text style={styles.textButton}>Pobierz QR</Text>
           </View>
           </TouchableOpacity>
        <Dialog visible={this.state.visible} onTouchOutside={() => {this.setState({ visible: false });}}>
        <DialogContent>
          <View style={styles.container3}>
            <Text style={styles.textQr} >Gratulacje! Odbierz zniżkę !!</Text>
            <QRCode
             value={this.state.qrValue+''}
             size={0.4*width}
             
             />
            
              <TouchableOpacity onPress={() => {this.setState({ visible: false});}}>
            <View style={styles.insideContainer3}>
             <Text style={styles.textButton}>OK</Text>
             </View>
           </TouchableOpacity>
            
          </View>
        </DialogContent>
        </Dialog>
          </View>
    </View>
      )
    })

}
setPromotions(){ // przetworzenie danych o ilosci punktów na promocje
   this.state.promotions = [];

  for(i=0;i<=this.state.point.points;i+=10){
    var x = i;
    if(x%100==0 && x!=0){
      x/=10;
      this.state.promotions.push(x)

    }

  }
  if(this.state.point.points%100!=0 && this.state.point.points>100){
    this.state.promotions.push(Math.floor(this.state.point.points/10))
   
  };
}
render() {
      {this.setPromotions()}

    return (
        <ScrollView style={styles.scrollview}>
          {this.getPromotions()}
        </ScrollView>
    )
  }
}



const styles = StyleSheet.create({
img: {
  width: 0.20 * width, 
  height: 0.20 * width,
 
},
scrollview:{
  width: '100%',
  marginLeft: 0.08 * width,
},
text: {
  fontSize: 0.05 * width,
    margin: width* 0.05, 
    color: "#000000",
    textAlign: 'left',
},
rowContainer: {
    flexDirection: 'column',
    color: "#000000",
    backgroundColor: '#ffffff',
    opacity: 0.9,
    width:0.8*width,
    marginLeft:0.05*width,
    margin:0.02*width,
    marginTop:0.04*width, 
    padding:0.02*width,
  },
insideContainer:{
  flexDirection: 'row',
  width:0.8*width,
  marginLeft:0.05*width,

},
insideContainer2:{
  flexDirection: 'row',
  width:'50%',
  marginLeft:'25%',
  justifyContent: 'center',
  backgroundColor:"#94cfd5",
  marginBottom:0.02*width,
  borderRadius: 10,

},
insideContainer3:{
  width:0.4*width,
  padding:0.01*width,
  justifyContent: 'center',
  backgroundColor:"#94cfd5",
  margin:0.06*width,
  borderRadius: 15,
  textAlign: 'center',
  alignItems: 'center'
},

container3:{
  textAlign: 'center',
  justifyContent: 'center',
  alignItems: 'center'
},

textButton:{
  fontSize: 0.04 * width,
  padding:0.02*width,
  color: "#000000",
},
textQr:{
    fontSize: 0.05 * width,
  padding:0.08*width, 
},
  });
