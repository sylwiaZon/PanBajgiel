import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView
} from 'react-native';

export default class Register extends React.Component {
    /*constructor(props){
        super(props);
        this.state={

        }
    };

    register() {
        fetch('http://'+global.ip+':8081/user/register/', {
            method: 'POST',
            body: JSON.stringify({
                GlobalUserModel
            }),
        });
    }*/


    render() {
        return(
            <View style = {styles.container}>
                <ImageBackground style = {styles.backgroundImage}
                                 source= {require('./assets/background2.png')} >
                    <View style = {styles.logoContainer}>
                        <Image style = {styles.logo}
                               source= {require('./assets/icon2.png')} />
                        <Text style = {styles.title}> Zarejestruj się</Text>
                    </View>
                    <View style = {styles.formContainer}>
                        <KeyboardAvoidingView style = {styles.container2}>
                            <View style = {styles.container2}>
                                <TextInput
                                    placeholder = "nazwa użytkownika"
                                    textAlign = 'center'
                                    placeholderTextColor = 'rgba(33,52,54,0.8)'
                                    style = {styles.input}
                                    returnKeyType = "next"
                                    autoCapitalize = "none"
                                    autoCorrect = {false}
                                    onSubmitEditing = {() => this.nameInput.focus()}
                                />
                                <TextInput
                                    ref = {(input) => this.nameInput = input}
                                    placeholder = "imię"
                                    textAlign = 'center'
                                    placeholderTextColor = 'rgba(33,52,54,0.8)'
                                    style = {styles.input}
                                    returnKeyType = "next"
                                    autoCapitalize = "none"
                                    autoCorrect = {false}
                                    onSubmitEditing = {() => this.passwordInput.focus()}
                                />
                                <TextInput
                                    ref = {(input) => this.passwordInput = input}
                                    textAlign = 'center'
                                    placeholder = "hasło"
                                    placeholderTextColor = 'rgba(33,52,54,0.8)'
                                    style = {styles.input}
                                    secureTextEntry
                                    returnKeyType = "go"
                                    autoCapitalize = "none"
                                    autoCorrect = {false}
                                />
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                    <TouchableOpacity onPress={() => this.props.navigation.navigate('App')} style = {styles.buttonContainer}>
                        <Text style = {styles.buttonText}>
                            Zarejestruj
                        </Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')} style = {styles.buttonContainer}>
                        <Text style = {styles.buttonText}>
                            Wróć
                        </Text>
                    </TouchableOpacity>
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
    },
    buttonContainer: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingVertical: 15,
        width: 150,
        borderRadius: 15,
        marginBottom: 10
    },
    buttonText: {
        textAlign: 'center',
        color: '#55858A',
        fontWeight: 'bold'
    },
    container2: {
        padding: 20
    },
    input: {
        height: 40,
        marginBottom: 20,
        backgroundColor: 'rgba(255,255,255,0.5)',
        color: '#55858A',
        paddingHorizontal: 10,
        fontWeight: 'bold',
        borderRadius: 15,
        width: 300
    },
})