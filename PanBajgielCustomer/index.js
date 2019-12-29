import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import AuthNavigation from './AuthNavigation.js'
import AppStacker from "./AppNavigation.js"
import {PromotionsStack, ProfileStack, ProductsStack, HomeStack, SettingsStack} from "./AppNavigation.js"
import Icon from "react-native-vector-icons/FontAwesome5";
import {Image} from "react-native";
import React from "react";
import {createBottomTabNavigator} from "react-navigation-tabs";


const SwitchNavigator = createSwitchNavigator(
    {
        Auth: AuthNavigation,
        App: AppStacker
    },
    {
        initialRouteName: 'Auth'
    }
)


const AppContainer = createAppContainer(SwitchNavigator)

export default AppContainer