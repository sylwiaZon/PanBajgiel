import React from 'react';

export class UserModel {
    login;
    password;
    name;
    points;
    stamps;
    client;

    constructor() {
    }

    

    setLogin(login) {
        this.login = login;
    }

    setPassword(password) {
        this.password = password;
    }

    setName(name) {
        this.name = name;
    }

    setPoints(points) {
        this.points = points;
    }

    setStamps(stamps) {
        this.stamps = stamps;
    }

    setClient(client) {
        this.client = client;
    }

}

const GlobalUserModel = new UserModel();
export default GlobalUserModel;

//import GlobalUserModel from './location/UserModel'; //get global instance