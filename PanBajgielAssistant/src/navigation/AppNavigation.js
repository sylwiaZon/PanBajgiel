import React from 'react';
import { createAppContainer } from 'react-navigation';
import { createSidebarNavigator } from '../tabs';
import {View, Text, Dimensions, ImageBackground, StyleSheet}from "react-native";
import {Header} from  'react-native-elements'
import {createStackNavigator} from "react-navigation-stack";
import {Transaction} from "./Transaction.js";
import Settings from "./Settings.js";
import Login from "./Login";


var {width, height} = Dimensions.get('window');
var formattedDate = new Date();
var newDate = formattedDate.getDay().toString() + "/" + formattedDate.getMonth().toString() + "/" + formattedDate.getFullYear().toString();

const styles = StyleSheet.create({
    header: {
        marginRight: 0.05 * width,
        color: 'white',
        fontSize: 0.02 * height,
    },
    background: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        opacity:0.8
    }
});

class ProfileScreen extends React.Component {
    render() {
        return(
            <View style={{ alignItems: 'center',justifyContent: 'center'}}>
                <ImageBackground accessible={true} testID="HomeScreen" accessibilityLabel={'HomeScreen'} source={require('../../assets/background.png')} style={styles.background}>
                <Header
                    centerComponent={{ text: 'UŻYTKOWNIK', style: { flex:1, color: '#fff', fontSize: 0.02 * height, alignItems: 'center',
                            justifyContent: 'center',}}}
                    containerStyle={{
                        backgroundColor: '#bef7e8',
                        height: 0.06 * height
                    }}
                />
                </ImageBackground>
            </View>
        );
    }
}


class TransactionScreen extends React.Component {
    render() {
        return(
            <View  accessible={true} testID="ProfileScreen" accessibilityLabel={'TransactionScreen'} style={{ alignItems: 'center',justifyContent: 'center'}}>
                <ImageBackground accessible={true} testID="HomeScreen" accessibilityLabel={'HomeScreen'} source={require('../../assets/background.png')} style={styles.background}>
                <Header
                    centerComponent={{ text: 'TRANSAKCJA', style: { flex:1, color: '#fff', fontSize: 0.02 * height, alignItems: 'center',
                            justifyContent: 'center',}}}
                    containerStyle={{
                        backgroundColor: '#bef7e8',
                        height: 0.06 * height
                    }}
                />
                <Transaction/>
                </ImageBackground>
            </View>
        );
    }
}

class StatsScreen extends React.Component {
    render() {
        return(
            <View  accessible={true}  testID="ProductsScreen" accessibilityLabel={'StatsScreen'} style={{ alignItems: 'center',justifyContent: 'center'}}>
                <ImageBackground accessible={true} testID="HomeScreen" accessibilityLabel={'HomeScreen'} source={require('../../assets/background.png')} style={styles.background}>
                <Header
                    centerComponent={{ text: 'STATYSTYKI', style: { flex:1, color: '#fff', fontSize: 0.02 * height, alignItems: 'center',
                            justifyContent: 'center',}}}
                    containerStyle={{
                        backgroundColor: '#bef7e8',
                        height: 0.06 * height
                    }}
                />
                </ImageBackground>
            </View>
        );
    }
}
class PricesScreen extends React.Component {
    render() {
        return(
            <View  accessible={true} testID="ProfileScreen" accessibilityLabel={'PricesScreen'} style={{ alignItems: 'center',justifyContent: 'center'}}>
                <ImageBackground accessible={true} testID="HomeScreen" accessibilityLabel={'HomeScreen'} source={require('../../assets/background.png')} style={styles.background}>
                <Header
                    centerComponent={{ text: 'CENNIK', style: { flex:1, color: '#fff', fontSize: 0.02 * height, alignItems: 'center',
                            justifyContent: 'center',}}}
                    containerStyle={{
                        backgroundColor: '#bef7e8',
                        height: 0.06 * height
                    }}
                />
                </ImageBackground>
            </View>
        );
    }
}
class SettingsScreen extends React.Component {
    render() {
        return(
            <View  accessible={true} testID="SettingsScreen" accessibilityLabel={'SettingsScreen'}>
                <ImageBackground accessible={true} testID="HomeScreen" accessibilityLabel={'HomeScreen'} source={require('../../assets/background.png')} style={styles.background}>
                <Header
                    centerComponent={{ text: 'USTAWIENIA', style: { flex:1, color: '#fff', fontSize: 0.02 * height, alignItems: 'center',
                            justifyContent: 'center',}}}
                    containerStyle={{
                    backgroundColor: '#bef7e8',
                        height: 0.06 * height
                }}
                />
                <Settings/>
                </ImageBackground>
            </View>
        );
    }
}

export const PricesStack = createStackNavigator({Prices: PricesScreen, },
    {defaultNavigationOptions: {
            title: '',
            headerRight: <Text style = {styles.header}>{newDate}</Text>,
            headerRightContainerStyle: {
                marginRight: 0.05 * width,
                color: 'white',
                fontSize: 0.02 * height
            },
            headerStyle: {
                backgroundColor: '#55858A',
                height: 0.07 * height,
                width: width,
                marginLeft: 0,
                position: 'absolute',
                zIndex: 1,
                elevation: 50
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
                textAlign:"center",
                flex:1
            },}})

export const SettingsStack = createStackNavigator({Settings: SettingsScreen, },
    {defaultNavigationOptions: {
            title: '',
            headerRight: <Text style = {styles.header}>{newDate}</Text>,
            headerRightContainerStyle: {
                marginRight: 0.05 * width,
                color: 'white',
                fontSize: 0.02 * height
            },
            headerStyle: {
                backgroundColor: '#55858A',
                height: 0.07 * height,
                width: width,
                marginLeft: 0,
                position: 'absolute',
                zIndex: 1,
                elevation: 50
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
                textAlign:"center",
                flex:1
            },}})

export const StatsStack = createStackNavigator({Stats: StatsScreen, },
    {defaultNavigationOptions: {
            title: '',
            headerRight: <Text style = {styles.header}>{newDate}</Text>,
            headerRightContainerStyle: {
                marginRight: 0.05 * width,
                color: 'white',
                fontSize: 0.02 * height
            },
            headerStyle: {
                backgroundColor: '#55858A',
                height: 0.07 * height,
                width: width,
                marginLeft: 0,
                position: 'absolute',
                zIndex: 1,
                elevation: 50
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
                textAlign:"center",
                flex:1
            },}})

export const ProfileStack = createStackNavigator({Profile: ProfileScreen, },
    {defaultNavigationOptions: {
            title: '',
            headerRight: <Text style = {styles.header}>{newDate}</Text>,
            headerRightContainerStyle: {
                marginRight: 0.05 * width,
                color: 'white',
                fontSize: 0.02 * height
            },
            headerStyle: {
                backgroundColor: '#55858A',
                height: 0.07 * height,
                width: width,
                marginLeft: 0,
                position: 'absolute',
                zIndex: 1,
                elevation: 50
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
                textAlign:"center",
                flex:1
            },}})

export const TransactionStack = createStackNavigator({Profile: TransactionScreen, },
    {defaultNavigationOptions: {
            title: '',
            headerRight: <Text style = {styles.header}>{newDate}</Text>,
            headerRightContainerStyle: {
                marginRight: 0.05 * width,
                color: 'white',
                fontSize: 0.02 * height
            },
            headerStyle: {
                backgroundColor: '#55858A',
                height: 0.07 * height,
                width: width,
                marginLeft: 0,
                position: 'absolute',
                zIndex: 1,
                elevation: 50
            },
            headerTintColor: '#FFFFFF',
            headerTitleStyle: {
                textAlign:"center",
                flex:1
            },}})

const sidebarNavigator = createSidebarNavigator(
    {
        Profile: ProfileStack,
        Transaction: TransactionStack,
        Stats: StatsStack,
        Prices: PricesStack,
        Settings: SettingsStack
    },
    {
        initialRouteName: 'Settings',
    },
);

export default createAppContainer(sidebarNavigator);