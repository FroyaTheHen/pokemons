import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext, useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  Button,
  TextInput,
} from "react-native";
import MapView, { Marker } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import { block } from "react-native-reanimated";
import { PokemonsLocationsContext } from "../contexts/PokeLocationContext";
import { PokemonLocation } from "../pokemons/Pokemons";
// import { PokemonLocation } from "../pokemons/Pokemons";
export default function TabPokemonMapScreen({
  navigation,
}: {
  navigation: any;
}) {
  const { pokemonsLocations, addPokemonLocation } = useContext(
    PokemonsLocationsContext
  );

  const [markedLocations, setMarkedLocations] = useState(pokemonsLocations);

  function getMarkedLocations() {
    let hyperString = "";
    markedLocations.forEach((e) => {
      hyperString = hyperString + " // " + JSON.stringify(e);
    });

    return hyperString;
  }

  useEffect(() => {
    getMarkedLocations();
  }, [markedLocations]);

  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
  });
  const [pin, setPin] = useState();

  const [pokemon, setPokemon] = useState({
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
  });

  const SavePin = () => {
    return (
      <View style={styles.poke_container}>
        <Pressable
          onPress={() => {
            const newPl: PokemonLocation = {
              name: pokemon.name,
              latitude: pin.latitude,
              longitude: pin.longitude,
            };
            addPokemonLocation(newPl);
            setMarkedLocations([...markedLocations, JSON.stringify(newPl)]);
          }}
        >
          <Text>save pin</Text>
        </Pressable>
      </View>
    );
  };

  const DropPin = () => {
    // but maybe make the input or a poke list of names or whever and the save b. drop down
    // only after the pin is dropped - that would be an elegent solution
    return (
      <View style={styles.poke_container}>
        <Pressable
          onPress={() => {
            setPin(region);
          }}
        >
          <Text>drop pin</Text>
        </Pressable>
      </View>
    );
  };

  const MarkerComponent = () => {
    return pin ? (
      <Marker
        coordinate={pin}
        draggable={true}
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
        <Marker
          coordinate={{
            latitude: 37.79032477931035,
            longitude: -122.43240052571046,
          }}
        />
      </MapView>
      <DropPin />
      <SavePin />

      <Text>
        {getMarkedLocations()}
        {/* {markedLocations} */}
        dscd
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // ...StyleSheet.absoluteFillObject,
    flex: 1, //the container will fill the whole screen.
    justifyContent: "flex-end",
    alignItems: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  poke_container: {
    backgroundColor: "white",
    flexDirection: "row",
    height: 30,
    width: 100,
    display: "flex",
    justifyContent: "center",
    marginBottom: 10,
  },
  poke_butt: {
    backgroundColor: "pink",
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    flexDirection: "column",
    width: 200,
  },
  item: {
    width: 100,
  },
});
