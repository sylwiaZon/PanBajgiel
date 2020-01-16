import React from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    ImageBackground,
    Button,
    TouchableOpacity,
    TextInput,
    Dimensions,
    KeyboardAvoidingView,
    BackHandler
} from 'react-native';
import Dialog from "react-native-dialog";

var {width, height} = Dimensions.get('window');

export default class Settings extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            newPassword: '',
            backupPasswordTest: '',
            dialogVisible: false,
            passwordPopUp: false,
            dialogPasswordVisible: false,
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
        this.setState({dialogPasswordVisible: false})
    };

    handleCancel = () => {
        this.setState({ dialogVisible: false });
    };

    goToLogin = () => {
        this.props.navigation.navigate('Auth');
    }
    
    handleLogOut = () => {
        BackHandler.exitApp();
    };


    handlePasswordChange = () => {
        if(this.state.backupPasswordTest === this.state.newPassword){
            fetch('http://' + global.ip + ':8081/user/password', {
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
                <View style = {styles.formContainer}>
                    <KeyboardAvoidingView style = {styles.container2}>
                        <View style = {styles.container2}>
                            <View style = {styles.main}>
                                <TouchableOpacity style = {styles.buttonContainer} onPress = {this.handleLogOut}>
                                    <Text style = {styles.buttonText}>
                                        Wyloguj się
                                    </Text>
                                </TouchableOpacity>

                                <Dialog.Container visible={this.state.dialogVisible}>
                                    <Dialog.Title>Account delete</Dialog.Title>
                                    <Dialog.Description>
                                        Jesteś pewny, że chcesz usunąć swoje konto?
                                    </Dialog.Description>
                                    <Dialog.Button label="Wróć" onPress={this.handleCancel} />
                                    <Dialog.Button label="Usuń" onPress={this.goToLogin} />
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
                    </KeyboardAvoidingView>
                </View>
            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center'

    },
    allButtonsContainer:{
        flexDirection: 'row',
        alignItems:'center',


    },
    buttonContainer: {
        backgroundColor: 'rgba(255,255,255,0.9)',
        width: width* 0.6,
        height: height * 0.06,
        borderRadius: 15,
        margin: width *0.02,
        justifyContent: 'center',
        paddingVertical: 15,
        marginBottom: 20,
        alignItems: 'center',

    },
    buttonContainerConfirm: {
        backgroundColor: 'rgba(238, 182, 254, 0.9)',
        width: width* 0.6,
        height: height * 0.06,
        borderRadius: 15,
        margin: width *0.02,
        justifyContent: 'center',
        paddingVertical: 15,
        marginBottom: 20,
        alignItems: 'center',

    },
    buttonText: {
        textAlign: 'center',
        color: '#55858A',
        fontWeight: 'bold',
        fontSize: width * 0.04

    },
    buttonContainer2: {
        //backgroundColor: 'rgba(255,255,255,0.9)',
        fontWeight: 'bold',
        borderRadius: 15,
        width: width* 0.5,
        height: height * 0.06,
        margin: width *0.02,
        justifyContent: 'center',
        backgroundColor:'#55858A'

    },
    buttonText2: {
        textAlign: 'center',
        color: '#fff',
        fontWeight: 'bold',
        fontSize: width * 0.05

    },
    dialogText: {
        color: '#55858A',
        fontWeight: 'bold',
        fontSize: width * 0.03

    },
    container2: {
        padding: 20
    },
    input: {
        height: height*0.05,
        marginBottom: 0.2,
        backgroundColor: 'rgba(255,255,255,0.5)',
        color: '#55858A',
        paddingHorizontal: width * 0.1,
        fontWeight: 'bold',
        borderRadius: 15,
        width: width* 0.5
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems:'center'
    },
    img: {
        width: 0.11 * width,
        height: 0.11 * width,
        marginRight: 0.05 * width,
        marginLeft: 0.1 * width
    },
    dialogTextContainer:{
        margin: width*0.05

    },
    dialogButtonContainer:{
        alignItems:'center'

    },
    popUp: {
        flex: 1
    },
})