import { StyleSheet, Text, View, Image, ScrollView, AppRegistry,  Animated,TouchableOpacity, Alert } from 'react-native';
import React,{Component} from 'react';
import {Dimensions, Button } from "react-native";
import Dialog, { DialogContent } from 'react-native-popup-dialog';
import QRCode from 'react-native-qrcode-svg';


var {width, height} = Dimensions.get('window');


export class Promotions extends Component {


constructor() {
    super();

   this.state = {
    login: 'loginUsera@mail.com',
    promotions: [],
    point:''
    };
  }
componentDidMount = () => {
   url = 'http://localhost:8081/user?login='+this.state.login

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

getPromotions(){
    return this.state.promotions.map((item,index) => {
      return ( 
        <View style={styles.rowContainer}>
        <View style={styles.insideContainer}>
         <Image  source={require('./assets/Mak.png')} style={styles.img}/>

         <Text style={styles.text}> Promocja {item} %</Text>
        </View>
		<View style={styles.insideContainer2}>
			<Button title="Pobierz QR" onPress={() => {this.setState({ visible: true });}}/>
  			<Dialog visible={this.state.visible} onTouchOutside={() => {this.setState({ visible: false });}}>
    		<DialogContent>
        	<View style={styles.container3}>
				<Text style={styles.textQr} >Gratulacje! Odbierz zniżkę !!</Text>
          		<QRCode
      			value='Jeśli nie chcesz mojej zguby mopsa daj mi luby !'
      			size={0.4*width}
      			color = "#94cfd5"/>
            	<View style={styles.insideContainer3}>
           			<Button title='OK' onPress={() => {this.setState({ visible: false});}}/>
           		</View>
            </View>
    		</DialogContent>
  			</Dialog>
          </View>
          </View>
      )
    })

}
  render() {
 
 
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
	width:'60%',
	padding:0.01*width,
	justifyContent: 'center',
	backgroundColor:"#94cfd5",
	margin:0.06*width,
	borderRadius: 15,
},

container3:{
	textAlign: 'center',
	justifyContent: 'center',
	alignItems: 'center'
},

textButton:{
	fontSize: 0.05 * width,
	padding:0.02*width,
	color: "#000000",
},
textQr:{
  	fontSize: 0.05 * width,
	padding:0.08*width, 
},
  });
