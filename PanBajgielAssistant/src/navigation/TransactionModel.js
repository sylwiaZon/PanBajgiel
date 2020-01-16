import React from 'react';

export class TransactionModel {
    userLogin;
    promotion;
    makAmount;
    solAmount;
    posypkaAmount;
    sezamAmount;
    wieloziarnistyAmount;
    serAmount;
    price;
    shopId;
    scanning;   
    constructor() {
    }
}

const GlobalTransactionModel = new TransactionModel();
export default GlobalTransactionModel;