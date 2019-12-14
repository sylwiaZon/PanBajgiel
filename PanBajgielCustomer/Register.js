import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground} from 'react-native';
import RegisterForm from "./RegisterForm";


export default class Login extends React.Component {
    render() {
        return(
            <View style = {styles.container}>
                <ImageBackground style = {styles.backgroundImage}
                                 source= {require('./assets/background2.png')} >
                    <View style = {styles.logoContainer}>
                        <Image style = {styles.logo}
                               source= {require('./assets/icon.png')} />
                        <Text style = {styles.title}> Zarejestruj się</Text>
                    </View>
                    <View style = {styles.formContainer}>
                        <RegisterForm/>
                    </View>
                </ImageBackground>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FEFEFE'
    },
    logoContainer: {
        alignItems: 'center',
        justifyContent: 'center'
    },
    logo: {
        width: 100,
        height: 100,
        alignItems: 'center'
    },
    title: {
        color: '#55858A',
        marginTop: 10,
        width: 200,
        textAlign: 'center',
        opacity: 0.9,
        fontWeight: 'bold',
    },
    backgroundImage:{
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.7
    },
    formContainer: {
        justifyContent: 'center'
    }
})