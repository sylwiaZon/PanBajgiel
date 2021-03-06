import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, TextInput, Alert,AsyncStorage} from 'react-native';
import {UserModel} from "./userModel.js";
const data = require("./server-info.json")

//widok i obsługa logowania
export default class Login extends React.Component {
     constructor(props) {
        super(props);
        state = {
            login: '',
            password: '',
        }
        
        

        this.setLogin = this.setLogin.bind(this)
        this.setPassword = this.setPassword.bind(this)
        //pobranie sesji, jesli uzytkownik sie zalogowal wczesniej przejście do głównej aplikacji
        AsyncStorage.getItem('user', (err, result) => {
           if(result!=null){
                      if(JSON.parse(result).name!=null){
                        var log = false;
                        let url = 'http://'+data.IP+':'+data.PORT+'/user?login='+JSON.parse(result).name;
                        
                        fetch(url, {method: "GET"})
                            .then(function(response) {
                                if (response.status==200){
                                     
                                    global.login=JSON.parse(result).name;
                                    log= true;
                                     props.navigation.navigate('App')
                                 }
                                 })
                            .catch((error) => {
                                
                                console.error(error)
                                
                                
                            })
            
                            
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

      
     async authenticateUser(){ 
        // autoryzacja logowania + jesli logowanie powiedzie się, zapisujemy sesje w AsyncStorage
        
        let url = 'http://'+data.IP+':'+data.PORT+'/user/login?login='+this.state.login+'&password='+this.state.password
       var name = this.state.login;
        await fetch(url, {method: "GET"})
        .then(function(response) {
        if (response.status==200){
             global.login=name;
        let UID123_object = {
                  name: global.login,
                  number: 30,
        };
       
        AsyncStorage.setItem('user', JSON.stringify(UID123_object), () => {
            AsyncStorage.getItem('user', (err, result) => {
              console.log(result);
          });
        });

           
        }
        if(response.status==404){
            global.login=null;
            Alert.alert("Błędne hasło lub login!!!");
            AsyncStorage.clear();
            
        }
    })
        .catch((error) => {
            
            console.error(error)
            
            
        });
          if(global.login!=undefined && global.login!=null){this.props.navigation.navigate('App')}
    }

    do = () => {
        this.props.navigation.navigate('App')
    };


    render() {
        return(
            <View style = {styles.container}>
                <ImageBackground style = {styles.backgroundImage}
                       source= {require('./assets/background2.png')} >
                    <View style = {styles.logoContainer}>
                        <Image style = {styles.logo}
                               source= {require('./assets/icon2.png')} />
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
                    <TouchableOpacity onPress={()=>{this.authenticateUser()}} style = {styles.buttonContainerLog}>
                        <Text style = {styles.buttonTextLog}>
                            Zaloguj
                        </Text>
                    </TouchableOpacity>
                    <Text style = {styles.title}>
                        lub
                    </Text>
                    <View>
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}
                            style = {styles.buttonContainer}>
                            <Text style = {styles.bottom}>
                                Załóż konto
                            </Text>
                        </TouchableOpacity>
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