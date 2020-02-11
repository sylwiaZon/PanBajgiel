import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground, TouchableOpacity, TextInput, AppRegistry, Alert,AsyncStorage, Dimensions} from 'react-native';
var {width, height} = Dimensions.get('window');
const data = require("./server-info.json");
// widok i obsługa logowania
export default class Login extends React.Component {

    constructor(props) {
        super(props);
   
        state = {
            login: '',
            password: '',

        }
        

        this.setLogin = this.setLogin.bind(this)
        this.setPassword = this.setPassword.bind(this)

        AsyncStorage.getItem('user', (err, result) => { // sprawdzenie  sesji, czy uzytkownik juz sie wczesniej logował
            console.log(JSON.parse(result));
           if(result!=null){
                       if(JSON.parse(result).name!=null){
                       
                        let url = 'http://'+data.IP+':'+data.PORT+'/user?login='+JSON.parse(result).name;
                        
                        fetch(url, {method: "GET"})
                            .then(function(response) {
                                if (response.status==200){
                                     
                                    global.login=JSON.parse(result).name;
                                    
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

  
    async authenticateUser(){ // sprawdzenie danych logowania
        console.log('aaaaaaaa')
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
            Alert.alert("Złe hasło!!!")
            global.login=null;
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
                       source= {require('../../assets/background.png')} >
                    <View style = {styles.logoContainer}>
                        <Image style = {styles.logo}
                               source= {require('../../assets/icon2.png')} />
                        
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
        width: width*0.4,
        height: width*0.4,
        alignItems: 'center'
    },
    title: {
        color: '#55858A',
        marginTop: 10,
        width: 250,
        textAlign: 'center',
        opacity: 0.9,
        fontWeight: 'bold',
        marginBottom: 20,
        fontSize: 18,
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
        fontWeight: 'bold',
        fontSize:20,
    },
    container2: {
        padding: 20
    },
    input: {
        height: 50,
        marginBottom: 20,
        backgroundColor: 'rgba(255,255,255,0.5)',
        color: '#55858A',
        paddingHorizontal: 10,
        fontWeight: 'bold',
        borderRadius: 15,
        width: width*0.5,
        fontSize: 20,
    },
})