import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import {Dimensions } from "react-native";


var {width, height} = Dimensions.get('window');



export class Products extends React.Component {
  render() {

    return (
  <ScrollView style={styles.scrollview}>
  	
  	<View style={styles.rowContainer}>
          <Image  source={require('./assets/Mak.png')} style={styles.img}/>
          <Text style = {styles.text}>
          Z makiem{"\n"}1,80 zł
          </Text>
    </View>

    <View style={styles.rowContainer}>
          <Image  source={require('./assets/Sezam.png')} style={styles.img}/>
          <Text style = {styles.text}>
          Z sezamem{"\n"}1,80 zł
          </Text>
    </View>


    <View style={styles.rowContainer}>
          <Image  source={require('./assets/Ser.png')} style={styles.img}/>
          <Text style = {styles.text}>
          Z serem{"\n"}1,80 zł
          </Text>
    </View>


    <View style={styles.rowContainer}>
          <Image  source={require('./assets/Sol.png')} style={styles.img}/>
          <Text style = {styles.text}>
          Z solą{"\n"}1,80 zł
          </Text>
    </View>


    <View style={styles.rowContainer}>
          <Image  source={require('./assets/Ostra_Posypka.png')} style={styles.img}/>
          <Text style = {styles.text}>
          Z ostrą posypką{"\n"}1,80 zł
          </Text>
    </View>

    <View style={styles.rowContainer}>
          <Image  source={require('./assets/Wieloziarnisty.png')} style={styles.img}/>
          <Text style = {styles.text}>
          Wieloziarnisty{"\n"}1,80 zł
          </Text>
    </View>

  </ScrollView>
    );
  }
}


const styles = StyleSheet.create({
img: {
  width: 0.35 * width, 
  height: 0.35 * width,
},
scrollview:{
	width: '100%',
	marginLeft: 0.08 * width,
},
text: {
	fontSize: 0.05 * width,
	width: width * 0.45 ,
	paddingTop: height * 0.012,
	paddingBottom: height * 0.01,
	margin: height* 0.05, 
	marginLeft: width * 0.04,
	marginRight: width * 0.01,
    color: "#000000",
    backgroundColor: '#f0f6f6',
    textAlign: 'center',
    opacity: 0.6,
},
rowContainer: {
    flexDirection: 'row'
  }

});

