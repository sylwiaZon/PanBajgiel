import { StyleSheet, Text, View, Image, ScrollView } from 'react-native';
import React from 'react';
import {Dimensions } from "react-native";
var {width, height} = Dimensions.get('window');


//widok cennika
export class Prices extends React.Component {
	render() {

    return (
  <ScrollView style={styles.scrollview}>
  <View style = {{justifyContent: 'center',
     flex:1}} >
  	<View style={styles.rowContainer}>
  	<View style = {{justifyContent: 'center',
    alignItems: 'center'}} accessible={true} testID="mak" accessibilityLabel={'mak'}>
          <Image accessible={true} testID="Mak" accessibilityLabel={'Mak'} source={require('../../assets/Mak.png')} style={styles.img}/>
          <Text style = {styles.text}>
          Z makiem{"\n"}1,80 zł
          </Text>
    </View>

    <View style = {{justifyContent: 'center',
    alignItems: 'center'}} accessible={true} testID="sezam" accessibilityLabel={'sezam'}>
          <Image accessible={true} testID="Sezam" accessibilityLabel={'Sezam'} source={require('../../assets/Sezam.png')} style={styles.img}/>
          <Text style = {styles.text}>
          Z sezamem{"\n"}1,80 zł
          </Text>
    </View>
</View>
  	<View style={styles.rowContainer}>
    <View style = {{justifyContent: 'center',
    alignItems: 'center'}} accessible={true} testID="ser" accessibilityLabel={'ser'}>
          <Image  accessible={true} testID="Ser" accessibilityLabel={'Ser'} source={require('../../assets/Ser.png')} style={styles.img}/>
          <Text style = {styles.text}>
          Z serem{"\n"}1,80 zł
          </Text>
    </View>


    <View style = {{justifyContent: 'center',
    alignItems: 'center'}} accessible={true} testID="sol" accessibilityLabel={'sol'}>
          <Image  source={require('../../assets/Sol.png')} style={styles.img}/>
          <Text style = {styles.text}>
          Z solą{"\n"}1,80 zł
          </Text>
    </View>

</View>
  	<View style={styles.rowContainer}>
    <View style = {{justifyContent: 'center',
    alignItems: 'center'}} accessible={true} testID="posypka" accessibilityLabel={'posypka'}>
          <Image  source={require('../../assets/Ostra_Posypka.png')} style={styles.img}/>
          <Text style = {styles.text}>
          Z ostrą posypką{"\n"}1,80 zł
          </Text>
    </View>

    <View style = {{justifyContent: 'center',
    alignItems: 'center'}} accessible={true} testID="Wieloziarnisty" accessibilityLabel={'Wieloziarnisty'}>
          <Image  source={require('../../assets/Wieloziarnisty.png')} style={styles.img}/>
          <Text style = {styles.text}>
          Wieloziarnisty{"\n"}1,80 zł
          </Text>
    </View>
</View>
</View>
  </ScrollView>
)
}
}


const styles = StyleSheet.create({
img: {
  width: 0.2 * width, 
  height: 0.2 * width,
},
scrollview:{
	width: '100%',
	marginLeft: 0.08 * width,
},
text: {
	fontSize: 0.03 * width,
	width: 0.3*width ,
	padding: height * 0.01,
	marginLeft: width * 0.04,
	marginRight: width * 0.04,
    color: "#000000",
    backgroundColor: '#f0f6f6',
    textAlign: 'center',
    opacity: 0.6,
    borderRadius: 12,
    overflow: 'hidden',
},
rowContainer: {
    flexDirection: 'row',


  }

});