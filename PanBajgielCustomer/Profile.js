import {Stamps} from './Stamps.js';
import {Card} from './Card.js';
import { StyleSheet,ImageBackground, Text, View, Image, ScrollView, AppRegistry,TouchableOpacity, Alert,Dimensions  } from 'react-native';
import React,{Component} from 'react';
import { TabView, TabBar, SceneMap } from 'react-native-tab-view';
import Animated from 'react-native-reanimated';

var {width, height} = Dimensions.get('window');



export class Profile extends React.Component {


constructor() {
    super();

   this.state = {
    login: 'loginUsera@mail.com',
    index: 0,
    routes: [
      { key: 'first', title: 'Twoja karta' },
      { key: 'second', title: 'Pieczątki' },
    ],
    };
  }


  render() {
     FirstRoute = () => (
    <View  accessible={true} testID="ProfileScreen" accessibilityLabel={'ProfileScreen'} style={{ alignItems: 'center',justifyContent: 'center'}}>
                <ImageBackground source={require('./assets/background.png')} style={styles.background}>
                   <Card/>
                </ImageBackground>
            </View>
)

SecondRoute = () => (
  <View  accessible={true} testID="ProfileScreenStamps" accessibilityLabel={'ProfileScreenStamps'} style={{ alignItems: 'center',justifyContent: 'center'}}>
                <ImageBackground source={require('./assets/background.png')} style={styles.background}>
                   <Stamps/>
                </ImageBackground>
            </View>
)


_handleIndexChange = index => this.setState({ index });


  _renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
  });


    return (


  <TabView
        navigationState={this.state}
        renderScene={SceneMap({
          first: FirstRoute,
          second: SecondRoute,
        })}
        renderTabBar={() => null}
        renderTabBar={props => 
          <TabBar {...props} 
        
          labelStyle={{fontSize:20}}
            inactiveColor="#000000"
            activeColor="#ffffff"
            style={{backgroundColor:'#48858d', color:'"#ffffff"', padding:5}}
            indicatorStyle={{backgroundColor:'#ffffff'}}
            />}
        onIndexChange={index => this.setState({ index })}
        
      />
          
  
    )
  }
}


const styles = StyleSheet.create({
  container: {
    marginTop: 0,
  },
scene: {
    flex: 1,
  },
   background: {
        width: '100%',
        height: '100%',
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


