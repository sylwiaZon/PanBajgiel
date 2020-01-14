import React from 'react';
import AppContainer from "./index";
import GlobalUserModel from "./userModel";

global.ip='104.211.12.200';
global.userLogin = 'user@mail.com';
global.userPassword = '';
global.userName = 'User';
global.userPoints = 75;
global.userStamps = 8;
global.userClient = 1;


export default class App extends React.Component {
    render() {
        return (
            //<AppContainer user={this.state.user} onUserChange={this.onChange}/>
            <AppContainer/>
        );
    }
}







