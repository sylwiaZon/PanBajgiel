import React from 'react';
import AppContainer from "./index";
import GlobalUserModel from "./userModel";


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







