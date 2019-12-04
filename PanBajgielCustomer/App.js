import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import Icon from "react-native-vector-icons/FontAwesome5";


export default class App extends React.Component {
  render() {
    return (
        <AppContainer />
    );
  }
}

class HomeScreen extends React.Component {
  render() {
    return(
     <View style={{ alignItems: 'center',justifyContent: 'center'}}>

     <ImageBackground source={require('./assets/background.png')} style={styles.background}>
    <Text>Banan głowny!</Text>
  </ImageBackground>
    </View>
    );
  }
}

class ProfileScreen extends React.Component {
  render() {
    return(
      <View style={{ alignItems: 'center',justifyContent: 'center'}}>
    <ImageBackground source={require('./assets/background.png')} style={styles.background}>
    <Text>Jestem bananem i to moje bananowe dane!</Text>
  </ImageBackground>
    </View>
    );
  }
}

class ProductsScreen extends React.Component {
  render() {
    return(
      <View style={{ alignItems: 'center',justifyContent: 'center'}}>
    <ImageBackground source={require('./assets/background.png')} style={styles.background}>
    <Text>Lista bananów!</Text>
  </ImageBackground>
    </View>
    );
  }
}
class PromotionsScreen extends React.Component {
  render() {
    return(
      <View style={{ alignItems: 'center',justifyContent: 'center'}}>
    <ImageBackground source={require('./assets/background.png')} style={styles.background}>
    <Text>Lista babanowych promocji :D!</Text>
  </ImageBackground>
    </View>
    );
  }
}
class SettingsScreen extends React.Component {
  render() {
    return(
      <View style={{ alignItems: 'center',justifyContent: 'center'}}>
    <ImageBackground source={require('./assets/background.png')} style={styles.background}>
    <Text>ja ustawiam banany!</Text>
  </ImageBackground>
    </View>
    );
  }
}
const bottomTabNavigator = createBottomTabNavigator(
  {
  	Settings: {
  		screen: SettingsScreen,
  		navigationOptions:{
  			tabBarIcon: ({ tintColor }) => (

          <Icon name="cog" size={36} color={tintColor} />
        )
  		}

  	},

  	Products: {
  		screen: ProductsScreen,
  		navigationOptions:{
  			tabBarIcon: ({ tintColor }) => (
           <Image source={(tintColor=='#a9ecf3') ? require( './assets/ikonaFocus.png')
                                : require( './assets/ikona.png')} style={{width:50, height:50}} />
        )
  		}
  	},

  	Promotions: {
  		screen: PromotionsScreen,
  		navigationOptions:{
  			tabBarIcon: ({ tintColor }) => (
          <Icon name="percentage" size={36} color={tintColor} />
        )
  		}
  	},

    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={36} color={tintColor} />
        )
      }
    },

    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" size={36} color={tintColor} />
        )
      }
    }
  },
  {
    initialRouteName: 'Home',
    tabBarOptions: {
    inactiveTintColor: '#fff',
      activeTintColor: '#a9ecf3',
      style: {
                backgroundColor: 'rgba(106,147,151,1)',
            },
            showLabel: false
    }
  }
);

const AppContainer = createAppContainer(bottomTabNavigator);

const styles = StyleSheet.create({
background: {
	width: '100%', 
	height: '100%',
	alignItems: 'center',
	justifyContent: 'center',
	opacity:0.8
}

});