import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, TextInput, AppRegistry, Alert,AsyncStorage} from 'react-native';


export default class Login extends React.Component {
    constructor() {
        super();
        state = {
            login: '',
            password: '',
        }
        

        this.setLogin = this.setLogin.bind(this)
        this.setPassword = this.setPassword.bind(this)

        AsyncStorage.getItem('user', (err, result) => {
            console.log(JSON.parse(result));
           if(result!=null){
                      if(JSON.parse(result).name!=null){
                        //console.log('aaaaa')
                        global.login=JSON.parse(result).name;
                         this.props.navigation.navigate('App')
                         //console.log(global.login);
                      }
                }
        });
    }

    setLogin(event) {

        this.setState({ login: event.nativeEvent.text })
     
    }

    setPassword(event) {

        
        this.setState({ password: event.nativeEvent.text })

    }

  
    authenticateUser = () => {
        
        let url = 'http://'+global.ip+':8081/user/login?login='+this.state.login+'&password='+this.state.password
        global.login=this.state.login
        fetch(url, {method: "GET"})
        .then(function(response) {

        if (response.status==200){

                   let UID123_object = {
          name: global.login,
          number: 30,
        };
        // You only need to define what will be added or updated


        AsyncStorage.setItem('user', JSON.stringify(UID123_object), () => {
            AsyncStorage.getItem('user', (err, result) => {
              console.log(result);
          });
        });

            this.props.navigation.navigate('App')
        }
        if(response.status==404){
            Alert.alert("Złe hasło!!!")
            
        }})
        .catch((error) => {
            //this.props.navigation.navigate('App')
            console.error(error)
            
            
        });
    }

    do = () => {
        this.props.navigation.navigate('App')
    };


    render() {

        return(
            <View style = {styles.container}>
                <ImageBackground style = {styles.backgroundImage}
                       source= {require('../../assets/background2.png')} >
                    <View style = {styles.logoContainer}>
                        <Image style = {styles.logo}
                               source= {require('../../assets/icon.png')} />
                           <Text style = {styles.title}> Zaloguj się, aby korzystać z aplikacji</Text>
                </View>
                <View style = {styles.formContainer}>
                    <View style = {styles.container2}>
                        <TextInput
                            placeholder = "login"
                            textAlign = 'center'
                            placeholderTextColor = 'rgba(33,52,54,0.7)'
                            style = {styles.input}
                            returnKeyType = "next"
                            autoCapitalize = "none"
                            autoCorrect = {false}
                            onSubmitEditing = {() => this.passwordInput.focus()}
                            //onChangeText={(login) => this.setState({login})}
                            onChange={this.setLogin}
                            //onchange={this.props.onchange()}
                            //value = {this.state.login}
                        />
                        <TextInput
                            ref = {(input) => this.passwordInput = input}
                            textAlign = 'center'
                            placeholder = "hasło"
                            placeholderTextColor = 'rgba(33,52,54,0.7)'
                            style = {styles.input}
                            secureTextEntry
                            returnKeyType = "go"
                            autoCapitalize = "none"
                            autoCorrect = {false}
                            onChange={this.setPassword}
                            //value = {this.state.password}
                        />
                    </View>
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
        backgroundColor: '#FEFEFE',
        width:'100%',
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
        backgroundColor: 'rgba(33,52,54,0.5)',
        paddingVertical: 15,
        width: 300,
        borderRadius: 15,
        marginBottom: 10
    },
    buttonTextLog: {
        textAlign: 'center',
        color: '#FFFFFF',
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