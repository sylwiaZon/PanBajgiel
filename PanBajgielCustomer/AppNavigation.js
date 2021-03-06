import {Products} from './Products.js';
import {Promotions} from './Promotions.js';
import {Profile} from './Profile.js';
import {Maps} from './Maps.js';
import Settings from "./Settings.js";
import React from 'react';
import {ImageBackground, StyleSheet, Text, View, Image} from "react-native";
import {createStackNavigator} from "react-navigation-stack";
import {createBottomTabNavigator} from "react-navigation-tabs";
import Icon from "react-native-vector-icons/FontAwesome5";

//nawigacja po głównej aplikacji



//ekran główny
class HomeScreen extends React.Component {
    render() {
        return(
            <View style={{ alignItems: 'center',justifyContent: 'center'}}>

                <ImageBackground accessible={true} testID="HomeScreen" accessibilityLabel={'HomeScreen'} source={require('./assets/background.png')} style={styles.background}>
                    <Maps/>
                </ImageBackground>
            </View>
        );
    }
}

//profil
class ProfileScreen extends React.Component {
    render() {
        return(
            
                     <Profile/>
                
        );
    }
}
// produkty
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
//promocje
class PromotionsScreen extends React.Component {
    render() {
        return(
            <View  accessible={true} testID="ProfileScreen" accessibilityLabel={'PromotionsScreen'} style={{ alignItems: 'center',justifyContent: 'center'}}>
                <ImageBackground source={require('./assets/background.png')} style={styles.background}>
                     <Promotions/>
                </ImageBackground>
            </View>
        );
    }
}
//ustawienia
class SettingsScreen extends React.Component {
    render() {
        return(
            <View  accessible={true} testID="SettingsScreen" accessibilityLabel={'SettingsScreen'} style={{ alignItems: 'center',justifyContent: 'center'}}>
                <ImageBackground source={require('./assets/background.png')} style={styles.background}>
                      <Settings navigation={this.props.navigation} />
                </ImageBackground>
            </View>
        );
    }
}

const HomeStack = createStackNavigator({Home: HomeScreen, },
    {defaultNavigationOptions: {
            title: 'Mapa',
            headerStyle: {
                backgroundColor: '#55858A'
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
                textAlign:"center",
                flex:1
            },}})

const ProfileStack = createStackNavigator({Profile: ProfileScreen, },
    {defaultNavigationOptions: {
            title: 'Profil',
            headerStyle: {
                backgroundColor: '#55858A'
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
                textAlign:"center",
                flex:1
            },}})

const PromotionsStack = createStackNavigator({Promotions: PromotionsScreen, },
    {defaultNavigationOptions: {
            title: 'Promocje',
            headerStyle: {
                backgroundColor: '#55858A'
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
                textAlign:"center",
                flex:1
            },}})

const SettingsStack = createStackNavigator({Settings: SettingsScreen, },
    {defaultNavigationOptions: {
            title: 'Ustawienia',
            headerStyle: {
                backgroundColor: '#55858A'
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
                textAlign:"center",
                flex:1
            },}})

const ProductsStack = createStackNavigator({Products: ProductsScreen, },
    {defaultNavigationOptions: {
            title: 'Produkty',
            headerStyle: {
                backgroundColor: '#55858A'
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
                textAlign:"center",
                flex:1
            },}})


const AppNavigation = createBottomTabNavigator(
    {
        Home: HomeStack,
        Profile: ProfileStack,
        Products: ProductsStack,
        Promotions: PromotionsStack,
        Settings: SettingsStack,
    },
  
    {
        defaultNavigationOptions: ({ navigation }) => ({
            tabBarIcon: ({ focused, tintColor }) => {
                const { routeName } = navigation.state;
                let iconName, iconId, iconLabel, flag = true;
                if (routeName === 'Home') {
                    iconName = "map-marked-alt",
                        iconId = "settingsIcon",
                        iconLabel = 'settingsIcon'
                } else if (routeName === 'Settings') {
                    iconName = "cog",
                        iconId = "settingsIcon",
                        iconLabel = 'settingsIcon'
                } else if (routeName === 'Products') {
                    iconName = "cog",
                        iconId = "productsIcon",
                        iconLabel = 'productsIcon',
                        flag = false
                } else if (routeName === 'Promotions'){
                    iconName = "percentage",
                        iconId = "promotionsIcon",
                        iconLabel = 'promotionsIcon'
                } else if (routeName === 'Profile'){
                    iconName = "user",
                        iconId = "profileIcon",
                        iconLabel = 'profileIcon'
                }
                return flag ? <Icon name={iconName} size={36} color={tintColor}  accessible={true} testID={iconId} accessibilityLabel ={iconLabel}  /> : <Image  source={(tintColor=='#a9ecf3') ? require( './assets/ikonaFocus.png')
                    : require( './assets/ikona.png')} style={{width:50, height:50}}  accessible={true} testID="productsIcon" accessibilityLabel={'productsIcon'} />;
            },
        }),
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


const styles = StyleSheet.create({
    background: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        opacity:0.8
    }
});
export default AppNavigation;

