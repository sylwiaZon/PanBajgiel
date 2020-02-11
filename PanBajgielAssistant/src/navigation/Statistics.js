
import { View, StyleSheet, Dimensions, Text, ImageBackground } from 'react-native';
import React,{Component} from 'react';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';
import {MainStatistics} from './MainStatistics.js';
import {ShopStatistics} from './ShopStatistics.js';
import {Header} from  'react-native-elements'
var {width, height} = Dimensions.get('window');


//widok TabView statystyk, generowanie zakładek dla statystyk głównych oraz statystyk konkretnego sklepu
export class Statistics extends React.Component {


constructor() {
    super();

   this.state = {
    
    index: 0,
    routes: [
      { key: 'first', title: 'Statystyki ogólne' },
      { key: 'second', title: 'Statystki sklepu' },
    ],
    };
  }


  render() {
    //pierwsza zakladka
         FirstRoute = () => (
    <View  accessible={true} testID="MainStatistics" accessibilityLabel={'MainStatistics'} style={{ alignItems: 'center',justifyContent: 'center'}}>
               
               
                 <MainStatistics/>
               
            </View>
)
//druga zakładka
SecondRoute = () => (

  <View  accessible={true} testID="ShopStatistics" accessibilityLabel={'ShopStatistics'} style={{ alignItems: 'center',justifyContent: 'center'}}>
              
                
                   <ShopStatistics/>
                
            </View>
)

initialLayout = { width: Dimensions.get('window').width };



  renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });



    return (
      
 <ImageBackground source={require('../../assets/background.png')} style={styles.background}>
                 

    <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
        })}
        renderTabBar={() => null}
        renderTabBar={props => 
          <TabBar {...props} 
        
          labelStyle={{fontSize:height*0.02}}
            inactiveColor="#ffffff"
            activeColor="#000000"
            style={{backgroundColor:'#60939b', color:'"#ffffff"', padding:5, textAlign: 'center'}}
            indicatorStyle={{backgroundColor:'#48858d'}}
            />}
        onIndexChange={index => this.setState({ index })}
        style={styles.container}
        
      />
      </ImageBackground>
  );
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: 0,
    width:0.86 * width,
    marginLeft:0.14*width,
    
  },
scene: {
    width:0.86 * width,
    marginLeft:0.14*width,
  },
   background: {
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
        opacity:0.8
    },
  tabBar: {
    flexDirection: 'row',
    paddingTop: 10,
    backgroundColor: '#ff0000',
   

  },

  label:{
    color:'yellow',
  },

  });


