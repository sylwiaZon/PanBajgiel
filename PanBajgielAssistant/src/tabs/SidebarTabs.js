import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
var {width, height} = Dimensions.get('window');
global.bajgiel=false;
const styles = StyleSheet.create({
    tab: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 0.14 * width,
        height: 0.12 * height,
        backgroundColor: 'transparent',
        overflow: 'hidden',
    },
    tabContainerColor: {
        height: height,
        width: 0.14 * width,
        backgroundColor: '#55858A',
        position: 'absolute',
        zIndex: 2,
        elevation: 50,
    },
    tabContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 0.6 * height,
        width: 0.14 * width,
        marginTop: 0.2 * height,
        marginBottom: 0.2 * height,
        position: 'absolute',
        zIndex: 3,
        elevation: 50
    },
    oneTab: {
        width: 0.14 * width,
        height: 0.12 * height,
    },
    stretch: {
        height: 0.09 * height,
        width: 0.09 * height,
        marginTop: 0.05 * height,
        marginLeft: 0.1 * width,
        position: 'absolute'
    },
    abs: {
        position: 'absolute',
        zIndex: 5
    }
});

const SidebarTabs = ({ navigation, descriptors }) => {
    const { routes, index } = navigation.state;

    return (
        <View style = {styles.tabContainerColor}>
            <View style = {styles.abs}>
                <Image style={styles.stretch} source = {require("../../assets/nazwa.png")} />
            </View>
        <View style={styles.tabContainer}>
            {routes.map((route, tabIndex) => {
                const { routeName, params } = route;
                let icon = 'cogs';
                let flag=true;
                const color = tabIndex === index ? 'white' : '#bdb9b9';
                if (routeName === 'Profile'){icon =  'user';}
                else if (routeName === 'Transaction'){icon = 'money';}
                else if (routeName === 'Stats'){icon = 'line-chart';}
                else if (routeName === 'Prices'){icon = 'bajgiel';}
                else {icon = 'cogs';}

                 
                return (
                    <View>
                    <View style = {styles.tab}>
                    <TouchableOpacity
                        onPress={() => {navigation.navigate(routeName); {routeName==='Prices' ? global.bajgiel=true : global.bajgiel=false}; {console.log(global.bajgiel)}}}
                        key={route.routeName}>

                        {(icon=='bajgiel') ? <Image  source={global.bajgiel ? require( '../../assets/ikona.png') : require( '../../assets/ikonaGray.png')} style={{width:0.06*height, height:0.06*height}}  /> :  <FontAwesome name={icon} size={0.05 *height} color={color} style={{ marginRight: 10 }} />}
                       
                    </TouchableOpacity>
                    </View>
                    </View>
                );
            
            })}
        </View>
    </View>
    );
};

export default SidebarTabs;