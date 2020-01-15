import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    AppRegistry,
    Alert,
    Dimensions
} from 'react-native';

var {width, height} = Dimensions.get('window');

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            login: '',
            password: '',
        };

        this.setLogin = this.setLogin.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.authenticateUser = this.authenticateUser.bind(this);
    }

    setLogin(event) {
        this.setState({ login: event.nativeEvent.text })

    }

    setPassword(event) {
        this.setState({ password: event.nativeEvent.text })
    }


    authenticateUser = () => {
        let url = 'http://'+global.ip+':8081/user?login='+this.state.login+'&password='+this.state.password
        global.login=this.state.login;
        fetch(url, {method: "GET"})
            .then(function(response) {
                if (response.status===200){
                    this.props.navigation.navigate('App')
                }
                if(response.status===404){
                    Alert.alert("Złe hasło!!!")
                }})
            .catch((error) => {
                this.props.navigation.navigate('App')
                console.error(error)


            });
    }


    render() {
        return(
            <View style = {styles.container}>
                <ImageBackground style = {styles.backgroundImage}
                                 source= {require('./assets/background.png')} >
                    <View style = {styles.logoContainer}>
                        <Image style = {styles.logo}
                               source= {require('./assets/icon.png')} />
                    </View>
                        <View style = {styles.container2}>
                            <TextInput
                                //placeholder = "login"
                                textAlign = 'center'
                                placeholderTextColor = 'rgba(33,52,54,0.7)'
                                style = {styles.input}
                                returnKeyType = "next"
                                autoCapitalize = "none"
                                autoCorrect = {false}
                                onSubmitEditing = {() => this.passwordInput.focus()}
                                onChange={this.setLogin}
                            />
                            <TextInput
                                ref = {(input) => this.passwordInput = input}
                                textAlign = 'center'
                                //placeholder = "hasło"
                                placeholderTextColor = 'rgba(33,52,54,0.7)'
                                style = {styles.input}
                                secureTextEntry
                                returnKeyType = "go"
                                autoCapitalize = "none"
                                autoCorrect = {false}
                                onChange={this.setPassword}
                            />
                    </View>
                    <TouchableOpacity onPress={this.authenticateUser} style = {styles.buttonContainerLog}>
                        <Text style = {styles.buttonTextLog}>
                            Zaloguj
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
        marginBottom: 20,
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
        textAlign: 'center',
        color: '#55858A',
        fontWeight: 'bold'
    },
    buttonContainer: {
        backgroundColor: 'rgba(255,255,255,0.5)',
        paddingVertical: 15,
        width: 300,
        borderRadius: 15
    },
    buttonContainerLog: {
        backgroundColor: '#55858A',
        width: width* 0.3,
        height: height * 0.06,
        borderRadius: 15,
        margin: width *0.02,
        justifyContent: 'center'
    },
    buttonTextLog: {
        textAlign: 'center',
        color: '#FFFFFF',
        fontWeight: 'bold',
    },
    container2: {
        padding: 20
    },
    input: {
        height: height*0.05,
        marginBottom: 5,
        backgroundColor: 'rgba(255,255,255,0.2)',
        color: '#55858A',
        paddingHorizontal: width * 0.1,
        fontWeight: 'bold',
        borderRadius: 15,
        width: width* 0.8
    },
})