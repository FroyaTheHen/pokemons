import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Button,
  TextInput,
} from "react-native";
import MapView, { Marker } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps

export default function TabPokemonMapScreen({
  navigation,
}: {
  navigation: any;
}) {
  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
    latitudeDelta: 0.01,
    longitudeDelta: 0.01,
  });
  const [pin, setPin] = useState();

  //   useEffect(() => {
  //     console.log("dropped at: ");
  //     console.log(pin);
  //   }, [pin]);

  const DropPin = () => {
    const [text, onChangeText] = React.useState("Useless Text");

    return (
      <View>
        <Button
          title="popopo"
          onPress={() => {
            setPin(region);
          }}
        />
      </View>
    );
  };

  const MarkerComponent = () => {
    return pin ? (
      <Marker
        coordinate={pin}
        draggable={true}
        // onDragEnd={(region) => {
        //   console.log(region);
        // }}
        onDragEnd={(e) => {
          console.log(e.nativeEvent.coordinate);
          setPin(e.nativeEvent.coordinate);
        }}
      />
    ) : null;
  };

  return (
    <View style={styles.container}>
      <MapView
        // provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        initialRegion={{
          latitude: 37.78825,
          longitude: -122.4324,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        onRegionChangeComplete={(region) => {
          setRegion(region);
        }}
      >
        <MarkerComponent />
        <DropPin />
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});
