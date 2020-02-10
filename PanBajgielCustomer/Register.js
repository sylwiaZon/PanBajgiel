import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    KeyboardAvoidingView, Alert,
    AsyncStorage
} from 'react-native';
const data = require("./server-info.json")

// rejestracja uzytkownika
export default class Register extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            login: '',
            name: '',
        };
        this.setPassword = this.setPassword.bind(this);
        this.setLogin = this.setLogin.bind(this);
        this.setName = this.setName.bind(this);
    }

    setPassword = (event) => {
        this.setState({ password: event.nativeEvent.text });

    };

    setLogin= (event) => {
        this.setState({ login: event.nativeEvent.text });
    };

    setName= (event) => {
        this.setState({ name: event.nativeEvent.text });
    };

    validate = (text) => {
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/ ;
        if(reg.test(text) === false)
        {
            Alert.alert("Email nie poprawny");
           this.setState({ login: null});

        }
        else {
            this.setState({ login: text});
            this.fetchRegister();
        }
    } 

   async fetchRegister(){ //rejestracja
        var name = this.state.login;
       
        console.log(this.state);
        await fetch('http://' + data.IP+':'+data.PORT + '/user/register', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: name,
                password: this.state.password,
                name: this.state.name
               
            }),
        }).then((response) => {console.log('response:',response.status);
        if(response.status == 200){
            global.login==name;
            let UID123_object = {
                  name: name,
                  number: 30,
        };
       
            AsyncStorage.setItem('user', JSON.stringify(UID123_object), () => {
                AsyncStorage.getItem('user', (err, result) => {
                  console.log(result);
              });
            });
             this.props.navigation.navigate('App');
        }
        else{
            Alert.alert("Login zajęty!")
        }
        });
        
         if(global.login!=undefined && global.login!=null){this.props.navigation.navigate('App')}
    }



    handleRegister = () => {
        this.validate(this.state.login);
    };

    render() {
        return(
            <View style = {styles.container}>
                <ImageBackground style = {styles.backgroundImage}
                                 source= {require('./assets/background.png')} >
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
                                    onChange={this.setLogin}
                                    ref="login"
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
                                    onChange={this.setName}
                                />
                                <TextInput
                                    ref = {(input) => this.passwordInput = input}
                                    textAlign = 'center'
                                    placeholder = "hasło"
                                    placeholderTextColor = 'rgba(33,52,54,0.8)'
                                    style = {styles.input}
                                    secureTextEntry
                                    //returnKeyType = "go"
                                    autoCapitalize = "none"
                                    autoCorrect = {false}
                                    onChange={this.setPassword}
                                />
                            </View>
                        </KeyboardAvoidingView>
                    </View>
                    <TouchableOpacity onPress={()=>{this.handleRegister()}} style = {styles.buttonContainer}>
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