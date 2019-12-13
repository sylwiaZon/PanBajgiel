import { StyleSheet, Text, View, Image, ScrollView, AppRegistry,  Animated,TouchableOpacity, Alert } from 'react-native';
import React,{Component} from 'react';
import {Dimensions } from "react-native";


var {width, height} = Dimensions.get('window');



export class Promotions extends Component {


constructor() {
    super();

   this.state = {
    promotions: [],
    point:''
    };
  }
componentDidMount = () => {

  fetch('http://52.142.162.240:8081/user?login=loginUsera@mail.com', {
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
<TouchableOpacity onPress={() => Alert.alert('tutaj funkcja do qr')}>
  <Text style={styles.textButton}>Pobierz QR</Text>
</TouchableOpacity>
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
    textAlign: 'center',
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
},
textButton:{
  fontSize: 0.05 * width,
padding:0.02*width,
    color: "#000000",
   
}

  });


