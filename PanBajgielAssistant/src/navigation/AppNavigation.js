import React from 'react';
import {Statistics} from "./Statistics.js";
import { createAppContainer } from 'react-navigation';
import { createSidebarNavigator } from '../tabs';
import {View, Text, Dimensions, ImageBackground, StyleSheet}from "react-native";
import {Header} from  'react-native-elements'
import {createStackNavigator} from "react-navigation-stack";
import {Transaction} from "./Transaction.js";
import {Prices} from "./Prices.js";

var {width, height} = Dimensions.get('window');
var formattedDate = new Date();
function formatDate(date){

    var dd = date.getDate();
    var mm = date.getMonth()+1;
    var yyyy = date.getFullYear();
    if(dd<10) {dd='0'+dd}
    if(mm<10) {mm='0'+mm}
    date = yyyy+'-'+mm+'-'+dd;
    return date
 }

var newDate = formatDate(formattedDate)
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
        opacity:0.8,
    },
      container: {
    marginTop: 0,
    width:0.86 * width,
    marginLeft:0.14*width,
    justifyContent:'center',
    alignItems:'center'
    
  },
});





class TransactionScreen extends React.Component {
    render() {
        return(
            <View  accessible={true} testID="TransactionScreen" accessibilityLabel={'TransactionScreen'} style={styles.container}>
                <ImageBackground  source={require('../../assets/background.png')} style={styles.background}>
                <Header
                    centerComponent={{ text: 'TRANSAKCJA', style: { flex:1, color: '#fff', fontSize: 0.02 * height, alignItems: 'center',
                            justifyContent: 'center',}}}
                    containerStyle={{
                        backgroundColor: '#60939b',
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
        	
             

                <Statistics/>

        );
    }
}
class PricesScreen extends React.Component {
    render() {
        return(
            <View  accessible={true} testID="PricesScreen" accessibilityLabel={'PricesScreen'} style={styles.container}>
                <ImageBackground accessible={true} testID="HomeScreen" accessibilityLabel={'HomeScreen'} source={require('../../assets/background.png')} style={styles.background}>
                <Header
                    centerComponent={{ text: 'CENNIK', style: { flex:1, color: '#fff', fontSize: 0.02 * height, alignItems: 'center',
                            justifyContent: 'center',}}}
                    containerStyle={{
                        backgroundColor: '#60939b',
                        height: 0.06 * height
                    }}
                />
                <Prices/>
                </ImageBackground>
            </View>
        );
    }
}
class SettingsScreen extends React.Component {
    render() {
        return(
            <View  accessible={true} testID="SettingsScreen" accessibilityLabel={'SettingsScreen'} style={styles.container}>
                <ImageBackground  source={require('../../assets/background.png')} style={styles.background}>
                <Header
                    centerComponent={{ text: 'USTAWIENIA', style: { flex:1, color: '#fff', fontSize: 0.02 * height, alignItems: 'center',
                            justifyContent: 'center',}}}
                    containerStyle={{
                    backgroundColor: '#60939b',
                        height: 0.06 * height
                }}
                />
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
        
        Transaction: TransactionStack,
        Stats: StatsStack,
        Prices: PricesStack,
        Settings: SettingsStack
    },
    {
        initialRouteName: 'Transaction',
    },
);

export default createAppContainer(sidebarNavigator);