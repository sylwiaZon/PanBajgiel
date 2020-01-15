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
    KeyboardAvoidingView
} from 'react-native';

var {width, height} = Dimensions.get('window');

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
            }),
        }).then((response) => {console.log('response:',response.status);
        this.setState({passwordPopUp: false});
        })
    };

    showPasswordChange = () => {
        this.setState({ passwordPopUp: true });
        console.log("jestem tuuu")
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
                                <TouchableOpacity style = {styles.buttonContainer}>
                                    <Text style = {styles.buttonText}>
                                        Wyloguj się
                                    </Text>
                                </TouchableOpacity>

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
                                            placeholder = "Wpisz nowe hasło  "
                                            placeholderTextColor = 'rgba(33,52,54,0.8)'
                                            style = {styles.input}
                                            secureTextEntry
                                            returnKeyType = "go"
                                            autoCapitalize = "none"
                                            autoCorrect = {false}
                                            onChange={this.setPassword}
                                        />
                                        <TouchableOpacity style = {styles.buttonContainerConfirm}
                                                          onPress = {this.handlePasswordChange}>
                                            <Text style = {styles.buttonText}>
                                                Zmień hasło
                                            </Text>
                                        </TouchableOpacity>
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