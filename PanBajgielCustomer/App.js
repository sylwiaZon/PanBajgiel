import {Products} from './Products.js';
import React from 'react';
import { StyleSheet, Text, View, ImageBackground, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';
import {createStackNavigator} from 'react-navigation-stack';

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

     <ImageBackground accessible={true} testID="HomeScreen" accessibilityLabel={'HomeScreen'} source={require('./assets/background.png')} style={styles.background}>
    <Text>Banan głowny!</Text>
  </ImageBackground>
    </View>
    );
  }
}

class ProfileScreen extends React.Component {
  render() {

    return(
      <View  accessible={true} testID="ProfileScreen" accessibilityLabel={'ProfileScreen'} style={{ alignItems: 'center',justifyContent: 'center'}}>
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
      <View  accessible={true}  testID="ProductsScreen" accessibilityLabel={'ProductsScreen'} style={{ alignItems: 'center',justifyContent: 'center'}}>
    <ImageBackground source={require('./assets/background.png')} style={styles.background}>
    <Products/>
  </ImageBackground>
    </View>
    );
  }
}
class PromotionsScreen extends React.Component {
  render() {
    return(
      <View  accessible={true} testID="ProfileScreen" accessibilityLabel={'PromotionsScreen'} style={{ alignItems: 'center',justifyContent: 'center'}}>
    <ImageBackground source={require('./assets/background.png')} style={styles.background}>
    <Text>Lista babanowych promocji 😀!</Text>
  </ImageBackground>
    </View>
    );
  }
}
class SettingsScreen extends React.Component {
  render() {
    return(
      <View  accessible={true} testID="SettingsScreen" accessibilityLabel={'SettingsScreen'} style={{ alignItems: 'center',justifyContent: 'center'}}>
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

          <Icon  name="cog" size={36} color={tintColor}  accessible={true}  testID="settingsIcon" accessibilityLabel={'settingsIcon'} />
        )
      }

    },

    Products: {
      screen: ProductsScreen,
      navigationOptions:{
        tabBarIcon: ({ tintColor }) => (
           <Image  source={(tintColor=='#a9ecf3') ? require( './assets/ikonaFocus.png')
                                : require( './assets/ikona.png')} style={{width:50, height:50}}  accessible={true} testID="productsIcon" accessibilityLabel={'productsIcon'} />
        )
      }
    },

    Promotions: {
      screen: PromotionsScreen,
      navigationOptions:{
        tabBarIcon: ({ tintColor }) => (
          <Icon  name="percentage" size={36} color={tintColor}  accessible={true}  testID="promotionsIcon" accessibilityLabel={'promotionsIcon'}/>
        )
      }
    },

    Home: {
      screen: HomeScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="home" size={36} color={tintColor}  accessible={true}  testID="homeIcon" accessibilityLabel={'homeIcon'} />
        )
      }
    },

    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: ({ tintColor }) => (
          <Icon name="user" size={36} color={tintColor}  accessible={true} testID="userIcon" accessibilityLabel ={'userIcon'}  />
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



const AppContainer = createAppContainer(bottomTabNavigator)

const AppNavigator = createStackNavigator(
    {
        Home: HomeScreen,
        Profile: ProfileScreen,
        Products: ProductsScreen,
        Promotions: PromotionsScreen
    },
    {
        initialRouteName: "Home"
    }
);


const styles = StyleSheet.create({
background: {
  width: '100%', 
  height: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  opacity:0.7
}

});