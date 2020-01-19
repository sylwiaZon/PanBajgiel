import React, { Component } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  Alert
} from "react-native";
import { TransactionModel } from "./TransactionModel.js";
import Dialog, { DialogContent } from "react-native-popup-dialog";
import { Scanner } from "./QRScanner.js";

var { width, height } = Dimensions.get("window");

export class Transaction extends React.Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      isLoading: true,
      products: [],
      details: [],
      stamps: 0,
      points: 0,
      scanningPromotion: false,
      scanningUser: false,
    };
  }

//dodanie transakcji
  fetchTransactionData() {
    this.transactionDate();
    fetch("http://" + global.ip + ":8081/product/transaction", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        userLogin: global.userLogin,
        shopId: global.shopId,
        date: global.date
      })
    });
  }
//dodanie szczegółów transakcji
  fetchDetailsData() {
    fetch("http://" + global.ip + ":8081/product/transactionDetails", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(this.state.details)
    });
  }
//pobranie aktualnej ceny produktów
  fetchProductsData() {
    fetch("http://" + global.ip + ":8081/product")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          products: responseJson
        });
      })
      .catch(error => {
        console.log(error);
      });
  }
//pobranie id sklepu
  fetchShopInfo() {
    fetch("http://" + global.ip + ":8081/user?login=" + global.login)
      .then(response => response.json())
      .then(responseJson => {
        global.shopId = responseJson.client;
      })
      .catch(error => {
        console.error(error);
      });
  }
//pobranie informacji o pkt użytkownika
  fetchUserPointsandStampsInfo() {
    fetch("http://" + global.ip + ":8081/user?login=" + global.userLogin)
      .then(response => response.json())
      .then(responseJson => {
        console.log(responseJson);
        this.setState({
          stamps: responseJson.stamps,
          points: responseJson.points
        });
      })
      .catch(error => {
        console.error(error);
      });
  }
//wysłanie żadąnia, aktualizacja pieczątek klienta
  fetchStamps(newStampsNumber) {
    let url ="http://" +global.ip +
      ":8081/user/update/stamps?login=" +
      global.userLogin +
      "&stamps=" +
      newStampsNumber;
    fetch(url, { method: "GET" }).catch(error => {
      this.props.navigation.navigate("App");
      console.error(error);
    });
  }
//wysłanie żadąnia, aktualizacja punktów klienta
  fetchPoints(newPointsNumber) {
    let url =
      "http://" +
      global.ip +
      ":8081/user/update/points?login=" +
      global.userLogin +
      "&points=" +
      newPointsNumber;
    fetch(url, { method: "GET" }).catch(error => {
      this.props.navigation.navigate("App");
      console.error(error);
    });
  }
//zwiększenie ilości pieczątek za zakup
  updateStamps() {
    var newStampsNumber = this.state.stamps;
    if (newStampsNumber < 10) {
      newStampsNumber = newStampsNumber + 1;
    }
    if (global.promotion == "free") {
      newStampsNumber = 0;
    }
    this.fetchStamps(newStampsNumber);
  }
//zwiększenie ilości punktów za zakup
  updatePoints() {
    var pointsNumber = this.state.points;
    var points = parseInt(pointsNumber) + parseInt(global.price);
    if(global.promotion != null && global.promotion != 'free'){
        points = points - parseInt(global.promotion)*10;
    }
    this.fetchPoints(points);
  }

  changeToNumber(string) {
    if (string == null) {
      return 0;
    } else {
      return Number(string);
    }
  }
//obliczenie ceny za zakup
  transactionPrice() {
    var promotion = 1;
    if (global.promotion != null && global.promotion != "free") {
      var promotion = (100 - Number(global.promotion)) * 0.01;
    }

    var mak = this.changeToNumber(global.makAmount);
    var sol = this.changeToNumber(global.solAmount);
    var posypka = this.changeToNumber(global.posypkaAmount);
    var sezam = this.changeToNumber(global.sezamAmount);
    var ser = this.changeToNumber(global.serAmount);
    var wieloziarnisty = this.changeToNumber(global.wieloziarnistyAmount);

    var price =
      (mak * Number(this.state.products[0].price) +
        sol * Number(this.state.products[4].price) +
        posypka * Number(this.state.products[3].price) +
        sezam * Number(this.state.products[1].price) +
        ser * Number(this.state.products[2].price) +
        wieloziarnisty * Number(this.state.products[5].price)) *
      promotion;
    global.price = Number(price.toFixed(2));
  }
//pobranie daty
  transactionDate() {
    var day = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    if (Number(day) < 10) {
      day = "0" + day;
    }
    if (Number(month) < 10) {
      month = "0" + month;
    }
    global.date = year + "-" + month + "-" + day;
  }
//przygotowanie informacji o transakcji do wysłania
  detailsData() {
    if (global.sezamAmount != null) {
      this.state.details.push({
        productId: Number(this.state.products[1].id),
        amount: Number(global.sezamAmount)
      });
    }
    if (global.serAmount != null) {
      this.state.details.push({
        productId: Number(this.state.products[2].id),
        amount: Number(global.serAmount)
      });
    }
    if (global.makAmount != null) {
      this.state.details.push({
        productId: Number(this.state.products[0].id),
        amount: Number(global.makAmount)
      });
    }
    if (global.solAmount != null) {
      this.state.details.push({
        productId: Number(this.state.products[4].id),
        amount: Number(global.solAmount)
      });
    }
    if (global.posypkaAmount != null) {
      this.state.details.push({
        productId: Number(this.state.products[3].id),
        amount: Number(global.posypkaAmount)
      });
    }
    if (global.wieloziarnistyAmount != null) {
      this.state.details.push({
        productId: Number(this.state.products[5].id),
        amount: Number(global.wieloziarnistyAmount)
      });
    }
  }

//walidacja wpisanej ilości produktów
  onChanged(text, kind) {
    let newText = "";
    let numbers = "0123456789";

    for (var i = 0; i < text.length; i++) {
      if (numbers.indexOf(text[i]) > -1) {
        newText = newText + text[i];
      } else {
        Alert.alert("Błąd", "Proszę wpisywać tylko cyfry!");
        switch (kind) {
          case "mak":
            this.textMak.clear();
            global.makAmount = null;
            break;

          case "sezam":
            this.textSezam.clear();
            global.sezamAmount = null;
            break;

          case "sol":
            this.textSol.clear();
            global.solAmount= null;
            break;

          case "posypka":
            this.textPosypka.clear();
            global.posypkaAmount= null;
            break;

          case "ser":
            this.textSer.clear();
            global.serAmount = null;
            break;

          case "wieloziarnisty":
            this.textWieloziarnisty.clear();
            global.wieloziarnisty = null;
            break;
        }
      }
    }
    switch (kind) {
      case "mak":
        global.makAmount = newText;
        break;

      case "sezam":
        global.sezamAmount = newText;
        break;

      case "sol":
        global.solAmount = newText;
        break;

      case "posypka":
        global.posypkaAmount = newText;
        break;

      case "ser":
        global.serAmount = newText;
        break;

      case "wieloziarnisty":
        global.wieloziarnistyAmount = newText;
        break;
    }
  }

  componentDidMount() {
    this.fetchProductsData();
    this.fetchShopInfo();
    this.transactionDate();

  }

  setUserLogin() {
    this.setState({ scanningUser: true });
    global.scanning = "user";
  }

  setPromotion() {
    this.setState({ scanningPromotion: true });
    global.scanning = "promotion";
  }

//czyszczenie danych
  clear() {
    global.promotion = null;
    global.userLogin = null;
    global.makAmount = null;
    global.solAmount = null;
    global.posypkaAmount = null;
    global.sezamAmount = null;
    global.sezamAmount = null;
    global.sezamAmount = null;
    global.date = null;
    global.price = 0;

    var empty = [];
    this.setState({ details: empty, stamps: 0, points: 0 });

    this.textMak.clear();
    this.textSezam.clear();
    this.textSol.clear();
    this.textPosypka.clear();
    this.textSer.clear();
    this.textWieloziarnisty.clear();
  }

  transcationSubmitAction() {
    this.detailsData();
    if (global.userLogin == null) {
      Alert.alert("Uwaga", "Nie zeskanowano użytkownika!");
    } 
    else if (!this.state.details.length){
      Alert.alert("Uwaga", "Brak zakupionych produktów!");
    }
    else{
      this.setState({ visible: false });
      this.fetchTransactionData();
      this.fetchDetailsData();
      this.updateStamps();
      this.updatePoints();
      this.clear();
    }
  }

  closeQrPromotion() {
    this.setState({ scanningPromotion: false });
    global.scanning = null;
  }
  closeQrUser() {
    this.setState({ scanningUser: false });
    global.scanning = null;
    this.fetchUserPointsandStampsInfo();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.formContainer}>
          <KeyboardAvoidingView style={styles.container2}>
            <View style={styles.container2}>
              <View
                style={styles.rowContainer}
                accessible={true}
                testID="mak"
                accessibilityLabel={"mak"}
              >
                <Image
                  source={require("../../assets/Mak.png")}
                  style={styles.img}
                />
                <TextInput
                  onChangeText={textMak => this.onChanged(textMak, "mak")}
                  ref={input => {
                    this.textMak = input;
                  }}
                  placeholder="MAK"
                  textAlign="center"
                  placeholderTextColor="rgba(33,52,54,0.8)"
                  style={styles.input}
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
              <View
                style={styles.rowContainer}
                accessible={true}
                testID="sol"
                accessibilityLabel={"sol"}
              >
                <Image
                  source={require("../../assets/Sol.png")}
                  style={styles.img}
                />
                <TextInput
                  onChangeText={textSol => this.onChanged(textSol, "sol")}
                  ref={input => {
                    this.textSol = input;
                  }}
                  placeholder="SÓL MORSKA"
                  textAlign="center"
                  placeholderTextColor="rgba(33,52,54,0.8)"
                  style={styles.input}
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View
                style={styles.rowContainer}
                accessible={true}
                testID="sezam"
                accessibilityLabel={"sezam"}
              >
                <Image
                  source={require("../../assets/Sezam.png")}
                  style={styles.img}
                />
                <TextInput
                  onChangeText={textSezam => this.onChanged(textSezam, "sezam")}
                  ref={input => {
                    this.textSezam = input;
                  }}
                  textAlign="center"
                  placeholder="SEZAM"
                  placeholderTextColor="rgba(33,52,54,0.8)"
                  style={styles.input}
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View
                style={styles.rowContainer}
                accessible={true}
                testID="ser"
                accessibilityLabel={"ser"}
              >
                <Image
                  source={require("../../assets/Ser.png")}
                  style={styles.img}
                />
                <TextInput
                  onChangeText={textSer => this.onChanged(textSer, "ser")}
                  ref={input => {
                    this.textSer = input;
                  }}
                  textAlign="center"
                  placeholder="SER"
                  placeholderTextColor="rgba(33,52,54,0.8)"
                  style={styles.input}
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View
                style={styles.rowContainer}
                accessible={true}
                testID="wieloziarnisty"
                accessibilityLabel={"wieloziarnisty"}
              >
                <Image
                  source={require("../../assets/Wieloziarnisty.png")}
                  style={styles.img}
                />

                <TextInput
                  onChangeText={textWieloziarnisty =>
                    this.onChanged(textWieloziarnisty, "wieloziarnisty")
                  }
                  ref={input => {
                    this.textWieloziarnisty = input;
                  }}
                  textAlign="center"
                  placeholder="WIELOZIARNISTY"
                  placeholderTextColor="rgba(33,52,54,0.8)"
                  style={styles.input}
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>

              <View
                style={styles.rowContainer}
                accessible={true}
                testID="posypka"
                accessibilityLabel={"posypka"}
              >
                <Image
                  source={require("../../assets/Ostra_Posypka.png")}
                  style={styles.img}
                />

                <TextInput
                  onChangeText={textPosypka =>
                    this.onChanged(textPosypka, "posypka")
                  }
                  ref={input => {
                    this.textPosypka = input;
                  }}
                  textAlign="center"
                  placeholder="OSTRA POSYPKA"
                  placeholderTextColor="rgba(33,52,54,0.8)"
                  style={styles.input}
                  returnKeyType="next"
                  autoCapitalize="none"
                  autoCorrect={false}
                />
              </View>
            </View>
          </KeyboardAvoidingView>
        </View>
        <View style={styles.allButtonsContainer}>
          <View style={styles.qrButtonsContainer}>
            <TouchableOpacity
              onPress={() => {
                this.setUserLogin();
              }}
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonText}>Skanuj kod qr kilenta</Text>
            </TouchableOpacity>

            <Dialog visible={this.state.scanningUser}>
              <DialogContent>
                <View style={styles.scannerText}>
                  <Text style={{ fontSize: width * 0.06, color: "#55858A" }}>
                    Zeskanuj kod QR użytkownika
                  </Text>
                </View>
                <Scanner />
                <View style={styles.dialogButtonContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      this.closeQrUser();
                    }}
                    style={styles.buttonContainer2}
                  >
                    <Text style={styles.buttonText2}>Powrót</Text>
                  </TouchableOpacity>
                </View>
              </DialogContent>
            </Dialog>

            <TouchableOpacity
              onPress={() => {
                this.setPromotion();
              }}
              style={styles.buttonContainer}
            >
              <Text style={styles.buttonText}>Skanuj kod qr nagrody</Text>
            </TouchableOpacity>
            <Dialog visible={this.state.scanningPromotion}>
              <DialogContent>
                <View style={styles.scannerText}>
                  <Text style={{ fontSize: width * 0.06, color: "#55858A" }}>
                    Zeskanuj kod QR nagrody
                  </Text>
                </View>
                <Scanner />
                <View style={styles.dialogButtonContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      this.closeQrPromotion();
                    }}
                    style={styles.buttonContainer2}
                  >
                    <Text style={styles.buttonText2}>Powrót</Text>
                  </TouchableOpacity>
                </View>
              </DialogContent>
            </Dialog>
          </View>

          <TouchableOpacity
            onPress={() => {
              this.setState({ visible: true });
              this.transactionPrice();
            }}
            style={styles.buttonContainer}
          >
            <Text style={styles.buttonText}>Podsumowanie</Text>
          </TouchableOpacity>
          <Dialog visible={this.state.visible}>
            <DialogContent>
              <View>
                <View style={styles.dialogTextContainer}>
                  <Text style={styles.dialogText}>Podsumowanie</Text>
                  <Text style={styles.dialogText}>Cena: {global.price} </Text>
                  {global.promotion == "free" || global.promotion == null ? (
                    <Text style={styles.dialogText}>Promocja: BRAK</Text>
                  ) : (
                    <Text style={styles.dialogText}>
                      Promocja: -{global.promotion} %
                    </Text>
                  )}
                  {global.promotion == "free" ? (
                    <Text style={styles.dialogText}>Darmowy bajgiel: Tak </Text>
                  ) : (
                    <Text style={styles.dialogText}>Darmowy bajgiel: Nie</Text>
                  )}
                </View>
                <View style={styles.dialogButtonContainer}>
                  <TouchableOpacity
                    onPress={() => {
                      this.transcationSubmitAction();
                    }}
                    style={styles.buttonContainer2}
                  >
                    <Text style={styles.buttonText2}>Zatwierdź</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({ visible: false });
                    }}
                    style={styles.buttonContainer2}
                  >
                    <Text style={styles.buttonText2}>Powrót</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </DialogContent>
          </Dialog>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingRight: width * 0.15
  },
  allButtonsContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  qrButtonsContainer: {
    borderRightWidth: 2,
    borderRightColor: "white",
    marginLeft: width * 0.2,
    marginRight: width * 0.03,
    paddingRight: width * 0.03
  },
  formContainer: {
    justifyContent: "center",
    marginBottom: height * 0.02
  },
  buttonContainer: {
    backgroundColor: "rgba(255,255,255,0.9)",
    width: width * 0.3,
    height: height * 0.06,
    borderRadius: 15,
    margin: width * 0.02,
    justifyContent: "center"
  },
  buttonText: {
    textAlign: "center",
    color: "#55858A",
    fontWeight: "bold",
    fontSize: width * 0.022
  },
  buttonContainer2: {
    backgroundColor: "rgba(255,255,255,0.9)",
    width: width * 0.3,
    height: height * 0.06,
    borderRadius: 15,
    margin: width * 0.02,
    justifyContent: "center",
    backgroundColor: "#55858A"
  },
  buttonText2: {
    textAlign: "center",
    color: "#fff",
    fontWeight: "bold",
    fontSize: width * 0.022
  },
  dialogText: {
    color: "#55858A",
    fontWeight: "bold",
    fontSize: width * 0.04
  },
  container2: {
    padding: 20
  },
  input: {
    height: height * 0.05,
    marginBottom: 0.2,
    backgroundColor: "rgba(255,255,255,0.5)",
    color: "#55858A",
    paddingHorizontal: width * 0.1,
    fontWeight: "bold",
    borderRadius: 15,
    width: width * 0.5
  },
  rowContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  img: {
    width: 0.11 * width,
    height: 0.11 * width,
    marginRight: 0.05 * width,
    marginLeft: 0.1 * width
  },
  dialogTextContainer: {
    margin: width * 0.05
  },
  dialogButtonContainer: {
    alignItems: "center"
  },
  scannerText: {
    width: "100%",
    margin: height * 0.05,
    marginLeft: width * 0.2,
    marginRight: width * 0.2
  }
});
