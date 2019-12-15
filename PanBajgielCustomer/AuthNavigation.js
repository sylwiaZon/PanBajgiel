import React from "react";
import {Image, ImageBackground, StyleSheet, Text, View} from "react-native";
import Login from "./Login";
import Register from "./Register";
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