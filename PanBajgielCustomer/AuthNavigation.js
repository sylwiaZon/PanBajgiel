import React from "react";
import {Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import Login from "./Login.js";
import Register from "./Register.js";
import {createStackNavigator} from "react-navigation-stack";



const AuthNavigation = createStackNavigator(
    {
        Login: { screen: Login },
        Register: { screen: Register }
    },
    {
        initialRouteName: 'Login',
        headerMode: 'none'
    }
)

export default AuthNavigation;