import { StyleSheet, Dimensions, Image, View, Text } from "react-native";
import React from "react";
import MapView from "react-native-maps";
var { width, height } = Dimensions.get("window");
import { UserModel } from "./userModel.js";

export class Maps extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: true,
      markers: []
    };
  }
//pobranie danych o lokalizacji sklepów
  fetchMarkerData() {
    fetch("http://" + global.ip + ":8081/shop")
      .then(response => response.json())
      .then(responseJson => {
        this.setState({
          isLoading: false,
          markers: responseJson
        });
      })
      .catch(error => {
        console.log(error);
      });
  }

  componentDidMount() {
    this.fetchMarkerData();
  }

  render() {
    return (
      <MapView
        style={styles.mapStyle}
        provider="google"
        initialRegion={{
          latitude: 50.06,
          longitude: 19.93,
          latitudeDelta: 0.009,
          longitudeDelta: 0.04
        }}
      >
      
        {this.state.isLoading
          ? null
          : this.state.markers.map((marker, index) => { //dynamiczne tworzenie znaczników
              var splitString = marker.localization.split(",");
              var latitude = Number(splitString[0]);
              var longitude = Number(splitString[1]);
              const name = `${marker.name}`;
              const coords = {
                latitude: latitude,
                longitude: longitude
              };

              const metadata = `Status: ${marker.statusValue}`;

              return (
                <MapView.Marker
                  key={index}
                  coordinate={coords}
                  title={marker.name}
                >
                  <Image
                    source={require("./assets/Mak.png")}
                    style={styles.img}
                  />
                  <MapView.Callout tooltip={true} style={styles.callout}>
                    <View style={styles.textContainer}>
                      <Text style={styles.text}>
                        Punkt nr {marker.id}
                        {"\n"}
                        {marker.address}
                      </Text>
                    </View>
                  </MapView.Callout>
                </MapView.Marker>
              );
            })}
      </MapView>
    );
  }
}

const styles = StyleSheet.create({
  mapStyle: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  img: {
    width: 0.13 * width,
    height: 0.13 * width
  },

  textContainer: {
    alignItems: "center"
  },
  text: {
    textAlign: "center",
    color: "#ffffff",
    fontWeight: "bold",
    fontSize: 0.04 * width
  },
  callout: {
    width: 0.4 * width,
    height: 0.09 * height,
    paddingTop: 0.02 * height,
    backgroundColor: "rgba(148, 207, 213,0.9)",
    borderRadius: 15,
    marginBottom: 20,
    alignItems: "center"
  }
});