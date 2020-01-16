import React, { Component } from "react";
import {
  Text,
  TouchableOpacity,
  View,
  Linking,
  TouchableHighlight,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  Alert
} from "react-native";
import Constants from "expo-constants";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import { BarCodeScanner } from "expo-barcode-scanner";
import { TransactionModel } from "./TransactionModel.js";

export class Scanner extends React.Component {
  state = {
    type: "back",
    permissionsGranted: false,
    barcodeScanned: true,
  };

//pobranie informacji o pozwoleniu na korzystanie z kamery urządzenia
  async componentWillMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ permissionsGranted: status === "granted" });

  }

  handleMountError = ({ message }) => console.error(message);

//zczytanie danych ze zeskanowanego kodu QR
  onBarCodeScanned = code => {
    if(this.state.barcodeScanned){
      if ((global.scanning == "user")) {
        global.userLogin = code.data;
        Alert.alert('Zeskanowano użytkownika');
      } 
      else if (global.scanning == "promotion") {
        if (!isNaN(Number(code.data))|| code.data == "free"){
          global.promotion = code.data;
          Alert.alert('Zeskanowano nagrodę');
        }
        else{
            Alert.alert("Zeskanowano zły QR !!!!");
            global.promotion = null;
        }
      }
    }
    this.setState({barcodeScanned:false});
  };
//wyrenderowanie inforamcji o braku uprawnień do kamery
  renderNoPermissions = () => (
    <View style={styles.noPermissions}>
      <Text style={{ color: "white" }}>
        Camera permissions not granted - cannot open camera preview.
      </Text>
    </View>
  );

//wyrenderowanie kamery
  renderCamera = () => (
    <View style={{ flex: 1 }}>
      <Camera
        ref={ref => {
          this.camera = ref;
        }}
        style={styles.camera}
        type={this.state.type}
        autoFocus={this.state.autoFocus}
        onMountError={this.handleMountError}
        barCodeScannerSettings={{
          barCodeTypes: [
            BarCodeScanner.Constants.BarCodeType.qr,
            BarCodeScanner.Constants.BarCodeType.pdf417
          ]
        }}
        onBarCodeScanned={this.onBarCodeScanned}
      ></Camera>
    </View>
  );

  render() {
    const cameraScreenContent = this.state.permissionsGranted
      ? this.renderCamera()
      : this.renderNoPermissions();
    const content = cameraScreenContent;
    return <View style={styles.container}>{content}</View>;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    width: "100%"
  },
  camera: {
    flex: 1,
    justifyContent: "space-between"
  },

  noPermissions: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10
  },

  row: {
    flexDirection: "row"
  }
});

