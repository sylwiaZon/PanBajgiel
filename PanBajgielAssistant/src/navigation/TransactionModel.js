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
    
   
    constructor() {
    }
}

const GlobalTransactionModel = new TransactionModel();
export default GlobalTransactionModel;