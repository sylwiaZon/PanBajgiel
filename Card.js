
import { StyleSheet,ImageBackground, Text, View, Image, ScrollView, AppRegistry,TouchableOpacity, Alert,Dimensions  } from 'react-native';
import React,{Component} from 'react';
import { TabView,TabBar, SceneMap } from 'react-native-tab-view';
//import QRCode from 'react-native-qrcode-svg';

var {width, height} = Dimensions.get('window');



export class Card extends React.Component {


constructor() {
    super();

   this.state = {
    login: 'loginUsera@mail.com', //tutaj podmienic na login z obiektu
    points:'',
    name:'',
    };
  }

componentDidMount = () => {
  url = 'http://52.142.162.240:8081/user?login='+this.state.login

  fetch(url, {
      method: "GET"
    })
    .then((response) => response.json())
    .then((responseJson) => {
         console.log(responseJson);
         this.setState({
            points: responseJson.points,
            name: responseJson.name
         })
      })
      
    .catch((error) => {
         console.error(error)
      })
    
}


  render() {
   




    return (
      <View style={styles.container} accessible={true} testID="CardView" accessibilityLabel={'CardView'}>
      <View style={{justifyContent:'center'}}>
        <View style={styles.textContainerUpper}>
          <Text style={styles.text}>Witaj {this.state.name}</Text>
           <Text style={styles.text}>Życzymy Ci miłego dnia!</Text>
        </View>

        
        <View style={styles.qrContainer}>
        <View style={styles.qr}>
          
       </View>
          <Text style={styles.textQr}>Skanuj podczas każdego zakupu</Text>
        </View>


        <View style={styles.textContainer}>
          <Text style={styles.textLower}>Masz {this.state.points} punktów</Text>
          </View>  
        </View>
      </View>
          
  
    )
  }
}


const styles = StyleSheet.create({
  container: {
    width:'100%',
    height:'100%',
    justifyContent:'center'
  },
   textLower:{
    padding:10,
    fontSize: 22,
    color:'#ffffff',
    textAlign: 'center',
  },
  text:{
    fontSize: 18,
    color:'#ffffff',
    textAlign: 'center',

  },
  textContainer: {
    backgroundColor: '#2a3f40',
    opacity: 0.8,
    justifyContent: 'center',
    padding:10,
  },
  textContainerUpper: {
    backgroundColor: '#2a3f40',
    opacity: 0.8,
    justifyContent: 'center',
    padding:10,
    marginTop:10,
  },
  textQr:{
    fontSize:16,
    color:'#ffffff',
    textAlign: 'center',
    margin:10,
  },
 qrContainer: {
   alignItems: 'center',
  justifyContent:'center',
  textAlign:'center',
  marginTop:width*0.05,
  marginBottom:width*0.05,
 },
 qr:{
  width:0.6*width,
  height:0.6*width,
  backgroundColor:'#ffffff',
  alignItems: 'center',
  justifyContent:'center',

 }


  
  });


