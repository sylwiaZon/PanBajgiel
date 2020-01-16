import { createAppContainer, createSwitchNavigator } from 'react-navigation'

import AppStacker from "./AppNavigation.js"
import {TransactionStack, StatsStack, PricesStack, SettingsStack} from "./AppNavigation.js"
import Icon from "react-native-vector-icons/FontAwesome5";
import {Image,AsyncStorage} from "react-native";
import React from "react";
import {createBottomTabNavigator} from "react-navigation-tabs";
import Login from "./Login.js";


// nawigacja pomiędzy ekranem logowania, a główną aplikacją
const SwitchNavigator = createSwitchNavigator(
    {
        Auth: {screen: Login},
        App: {screen: AppStacker}
    },
    {
        initialRouteName: 'Auth'
    }
)


const AppContainer = createAppContainer(SwitchNavigator)

export default AppContainer