import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground, Button, TouchableOpacity, TextInput} from 'react-native';
import Dialog from "react-native-dialog";

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: '',
            dialogVisible: false,
            passwordPopUp: false
        }

        this.setPassword = this.setPassword.bind(this);
    }

    setPassword = (event) => {
        this.setState({ newPassword: event.nativeEvent.text })
    };


    showDeletionDialog = () => {
        this.setState({ dialogVisible: true });
    };

    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };

    handleDelete = () => {
        let url = 'http://'+global.ip+':8081/user/delete/login='+this.state.login;

        fetch(url, {method: "GET"})
            .then(function(response) {
                if (response.ok){
                    console.log(ok);
                    this.setState({ dialogVisible: false });
                }})
            .catch((error) => {
                console.error(error)
            });
    };


    handlePasswordChange = () => {
        console.log(this.state.newPassword);
        console.log(global.userLogin);
        fetch('http://' + global.ip + ':8081/user/password', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: global.userLogin,
                password: this.state.newPassword,
                name: global.userName,
                points: global.userPoints,
                stamps: global.userStamps,
                client: global.userClient,
            }),
        }).then((response) => {console.log('response:',response.status);
        this.setState({passwordPopUp: false});
        })
    };

    showPasswordChange = () => {
        this.setState({ passwordPopUp: true });
    };

    submit = () => {
        this.setState({passwordPopUp: false})
    };


    render() {
        return(
            <View style = {styles.container}>
                <ImageBackground style = {styles.backgroundImage}
                                 source= {require('./assets/background2.png')} >
                    <View style = {styles.main}>
                        <TouchableOpacity style = {styles.buttonContainer}>
                            <Text style = {styles.buttonText}>
                                Wyloguj się
                            </Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style = {styles.buttonContainer}
                            onPress = {this.showDeletionDialog}>
                            <Text style = {styles.buttonText}>
                                Usuń konto
                            </Text>
                        </TouchableOpacity>

                        <Dialog.Container visible={this.state.dialogVisible}>
                            <Dialog.Title>Account delete</Dialog.Title>
                            <Dialog.Description>
                                Jesteś pewny, że chcesz usunąć swoje konto?
                            </Dialog.Description>
                            <Dialog.Button label="Wróć" onPress={this.handleCancel} />
                            <Dialog.Button label="Usuń" onPress={this.handleDelete} />
                        </Dialog.Container>

                        <TouchableOpacity style = {styles.buttonContainer}
                                          onPress = {this.showPasswordChange}>
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
                                    />
                                    <TouchableOpacity style = {styles.buttonContainer}
                                                      onPress = {this.handlePasswordChange}>
                                        <Text style = {styles.buttonText}>
                                            Zmień hasło
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                                : null}
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
        marginBottom: 20,
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
        position:'absolute',
        flex: 1,
        alignItems: 'center'
    },
    input: {
        height: 40,
        marginBottom: 20,
        marginTop: 30,
        backgroundColor: 'rgba(255,255,255,0.5)',
        color: '#55858A',
        paddingHorizontal: 10,
        fontWeight: 'bold',
        borderRadius: 15,
    },
})