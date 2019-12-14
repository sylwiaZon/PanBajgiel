import React from 'react';
import {View, Text, Image, StyleSheet, ImageBackground, Button, TouchableOpacity, TextInput} from 'react-native';
import Dialog from "react-native-dialog";
//import PasswordChange from "./PasswordChange";

export default class Settings extends React.Component {
    state = {
        dialogVisible: false,
        passwordPopUp: false
    };

    showDeletionDialog = () => {
        this.setState({ dialogVisible: true });
    };

    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };

    handleDelete = () => {
        // The user has pressed the "Delete" button, so here you can do your own logic.
        // ...Your logic
        this.setState({ dialogVisible: false });
    };

    showPasswordChange = () => {
        this.setState({ passwordPopUp: true });
    };

    submit = () => {
        //console.log(bla);
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
                            <Dialog.Title>Usunięcie konta</Dialog.Title>
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
                                    />
                                    <TouchableOpacity style = {styles.buttonContainer}
                                                      onPress = {this.submit}>
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