import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground, Button, TouchableOpacity, TextInput,AsyncStorage, BackHandler} from 'react-native';
import Dialog from "react-native-dialog";

const data = require("./server-info.json")

//widok ustawień
export default class Settings extends React.Component {
    constructor() {
        super();
        this.state = {
            newPassword: '',
            backupPasswordTest: '',
            dialogVisible: false,
            passwordPopUp: false,
            dialogPasswordVisible: false,
            text: ''
        };

        this.setPassword = this.setPassword.bind(this);
        this.setBackupPassword = this.setBackupPassword.bind(this);
        this.showDeletionDialog = this.showDeletionDialog.bind(this);
        this.showPasswordDialog = this.showPasswordDialog.bind(this);
        this.hidePasswordDialog = this.hidePasswordDialog.bind(this);
    }
   
    setPassword = (event) => {
        this.setState({ newPassword: event.nativeEvent.text });
    };

    setBackupPassword = (event) => {
        this.setState({ backupPasswordTest: event.nativeEvent.text });
    };

    showDeletionDialog = () => {
        this.setState({ dialogVisible: true });
    };

    showPasswordDialog = () => {
        this.setState({dialogPasswordVisible: true})
    };

    hidePasswordDialog = () => {
        this.setState({dialogPasswordVisible: false});
        this.refs.SecondInput.setNativeProps({text: ''});
        this.refs.FirstInput.setNativeProps({text: ''});
    };

    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };

    goToLogin = () => {
        this.props.navigation.navigate('Auth');
    }


     handleDelete = async() => { // usuwanie uźytkownika
        let url = 'http://'+data.IP+':'+data.PORT+'/user?login='+global.login;
       
       
            await fetch(url, {
                method: 'DELETE',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
            }).then(() => {
                
                 AsyncStorage.clear(); 
                console.log('removed');
            }).catch(err => {
                console.error(err)
               
            })
        
    
        this.props.navigation.navigate('Auth');
    }
    handleLogOut = async() =>{
       await AsyncStorage.clear();
       this.props.navigation.navigate('Auth');
    }
    handlePasswordChange = () => { // zmiana hasła
        if(this.state.backupPasswordTest === this.state.newPassword){
            fetch('http://' + data.IP+':'+data.PORT + '/user/password', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    login: global.login,
                    password: this.state.newPassword
                }),
            }).then((response) => {console.log('response:',response.status);
                this.setState({passwordPopUp: false});
            })
        }
        else {
            this.showPasswordDialog();
        }
    };

    showPasswordChange = () => {
        this.setState({ passwordPopUp: !this.state.passwordPopUp });
    };

    submit = () => {
        this.setState({passwordPopUp: false})
    };
  


    render() {
        return(
            <View style = {styles.container}>
            
                    <View style = {styles.main}>
                        <TouchableOpacity style = {styles.buttonContainer} onPress = {()=>{this.handleLogOut()}}>
                            <Text style = {styles.buttonText}>
                                Wyloguj się
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style = {styles.buttonContainer}
                            onPress = {()=>{this.setState({ dialogVisible: true })}}>
                            <Text style = {styles.buttonText}>
                                Usuń konto
                            </Text>
                        </TouchableOpacity>
                        <Dialog.Container visible={this.state.dialogVisible}>
                            <Dialog.Title>Account delete</Dialog.Title>
                            <Dialog.Description>
                                Jesteś pewny, że chcesz usunąć swoje konto?
                            </Dialog.Description>
                            <Dialog.Button label="Wróć" onPress={()=>{this.setState({ dialogVisible: false })}} />
                            <Dialog.Button label="Usuń" onPress={()=>{this.handleDelete();}} />
                        </Dialog.Container>

                        <TouchableOpacity style = {styles.buttonContainer}
                                          onPress = {()=>{this.showPasswordChange()}}>
                            <Text style = {styles.buttonText}>
                                Zmień hasło
                            </Text>
                        </TouchableOpacity>
                        {this.state.passwordPopUp ?
                            <View style = {styles.popUp}>
                                <TextInput
                                    textAlign = 'center'
                                    placeholder = "Wpisz nowe hasło"
                                    placeholderTextColor = 'rgba(33,52,54,0.8)'
                                    style = {styles.input}
                                    secureTextEntry
                                    returnKeyType = "go"
                                    autoCapitalize = "none"
                                    autoCorrect = {false}
                                    onChange={this.setPassword}
                                    ref = "FirstInput"
                                />
                                <TextInput
                                    textAlign = 'center'
                                    placeholder = "Potwierdź nowe hasło"
                                    placeholderTextColor = 'rgba(33,52,54,0.8)'
                                    style = {styles.input}
                                    secureTextEntry
                                    returnKeyType = "go"
                                    autoCapitalize = "none"
                                    autoCorrect = {false}
                                    onChange={this.setBackupPassword}
                                    ref = "SecondInput"
                                />
                                <TouchableOpacity style = {styles.buttonContainer}
                                                  onPress = {this.handlePasswordChange}>
                                    <Text style = {styles.buttonText}>
                                        Ustaw nowe hasło
                                    </Text>
                                </TouchableOpacity>
                                {this.state.dialogPasswordVisible?
                                    <Dialog.Container visible={this.state.dialogPasswordVisible}>
                                        <Dialog.Title>Ostrzeżenie</Dialog.Title>
                                        <Dialog.Description>
                                            Hasła nie są jednakowe!
                                        </Dialog.Description>
                                        <Dialog.Button label="Wróć" onPress={this.hidePasswordDialog} />
                                    </Dialog.Container>
                                    : null}
                            </View>
                            : null}
                    </View>
               
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
       
          justifyContent: "center",
        alignItems: "center",
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
    buttonContainer: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingVertical: 15,
        width: 300,
        borderRadius: 15,
        marginBottom: 15,
        marginTop: 10,
        alignItems: 'center',
    },
    buttonText: {
        textAlign: 'center',
        color: '#55858A',
        fontWeight: 'bold'
    },
    popUp: {
        flex: 1
    },
    main: {
        
        flex: 1,
        alignItems: 'center'
    },
    input: {
        height: 40,
        marginTop: 8,
        backgroundColor: 'rgba(255,255,255,0.5)',
        color: '#55858A',
        paddingHorizontal: 10,
        fontWeight: 'bold',
        borderRadius: 15,
    },
})