import React from 'react';
import AppContainer from "./index.js";
import GlobalUserModel from "./userModel.js";


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







