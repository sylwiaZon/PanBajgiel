import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground, TouchableWithoutFeedback, Keyboard, ActivityIndicator} from 'react-native';
import LoginForm from "./LoginForm";


export default class Login extends React.Component {
    do = () => {
        console.log('cos');
    };

    render() {
        return(
            <View style = {styles.container}>
                <ImageBackground style = {styles.backgroundImage}
                       source= {require('./assets/background2.png')} >
                    <View style = {styles.logoContainer}>
                        <Image style = {styles.logo}
                               source= {require('./assets/icon.png')} />
                           <Text style = {styles.title}> Zaloguj się, aby korzystać z aplikacji</Text>
                </View>
                <View style = {styles.formContainer}>
                    <LoginForm />
                </View>
                    <View>
                        <Text style = {styles.bottom} onPress = {this.do}>
                            Załóż konto
                        </Text>
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
        fontWeight: 'bold'
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
    },
    bottom: {
        color: '#FFFFFF',
        fontWeight: 'bold'
    }
})