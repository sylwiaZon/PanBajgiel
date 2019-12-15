import React from 'react';
import {View, Text, Image, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView} from 'react-native';

export default class LoginForm extends React.Component {
    render() {
        return(
            <KeyboardAvoidingView style = {styles.container}>
                <View style = {styles.container}>
                    <TextInput
                        ref = {(input) => this.passwordInput = input}
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
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    input: {
        height: 40,
        marginBottom: 20,
        backgroundColor: 'rgba(255,255,255,0.5)',
        color: '#55858A',
        paddingHorizontal: 10,
        fontWeight: 'bold',
        borderRadius: 15
    },
    buttonContainer: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        paddingVertical: 15,
        width: 300,
        borderRadius: 15
    },
    buttonText: {
        textAlign: 'center',
        color: '#55858A',
        fontWeight: 'bold'
    }
})