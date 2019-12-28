import React from 'react';
import AppContainer from "./index.js";
import GlobalUserModel from "./userModel.js";

global.ip='13.90.100.215'

export default class App extends React.Component {
    /*constructor() {
        super();
        this.state ={
        "user" :  GlobalUserModel,
        }
    }*/

    render() {
        return (
            //<AppContainer user={this.state.user} onUserChange={this.onChange}/>
            <AppContainer/>
        );
    }

    onChange(user){

    }
}







