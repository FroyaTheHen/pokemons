import React, { useContext, useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Pressable,
  TouchableOpacity,
} from "react-native";
import MapView, { Marker } from "react-native-maps"; // remove PROVIDER_GOOGLE import if not using Google Maps
import { PokemonsLocationsContext } from "../contexts/PokeLocationContext";
import { PokemonLocation, BASE_URL } from "../pokemons/Pokemons";
import Autocomplete from "react-native-autocomplete-input";

import Ionicons from "react-native-vector-icons/Ionicons";
import { pokeGrey } from "../Styles";

export default function TabPokemonMapScreen({
  navigation,
}: {
  navigation: any;
}) {
  const { pokemonsLocations, addPokemonLocation } = useContext(
    PokemonsLocationsContext
  );
  const [markedLocations, setMarkedLocations] = useState(pokemonsLocations);
  const [displayInput, setDisplayInput] = useState(false);

  const renderPokeMarkerComponent = (pokeLocation: PokemonLocation) => {
    return (
      <Marker
        coordinate={{
          latitude: pokeLocation.latitude,
          longitude: pokeLocation.longitude,
        }}
        description={pokeLocation.name}
      />
    );
  };

  const [region, setRegion] = useState({
    latitude: 51.5079145,
    longitude: -0.0899163,
  });
  const [pin, setPin] = useState();

  const [pokemon, setPokemon] = useState({
    name: undefined,
    url: undefined,
  });

  // show either one of the pressables - switch on each click
  const [savePinDisplay, setSavePinDisplay] = useState(false);
  const [dropPinDisplay, setDropPinDisplay] = useState(true);

  const SavePin = () => {
    return (
      <View
        style={savePinDisplay ? styles.save_pin_view : styles.dontDisplayMe}
      >
        <Pressable
          onPress={() => {
            const newPl: PokemonLocation = {
              name: pokemon.name,
              latitude: pin.latitude,
              longitude: pin.longitude,
            };
            addPokemonLocation(newPl);
            setMarkedLocations([...markedLocations, newPl]);
            setDropPinDisplay(!dropPinDisplay);
            setSavePinDisplay(!savePinDisplay);
            setDisplayInput(!displayInput);
          }}
        >
          <Text>
            <Ionicons name={"ios-pin"} size={25} color={"black"} />
            save pokemon location
          </Text>
        </Pressable>
      </View>
    );
  };

  const DropPin = () => {
    // but maybe make the input or a poke list of names or whever and the save b. drop down
    // only after the pin is dropped - that would be an elegant solution
    return (
      <View
        style={dropPinDisplay ? styles.drop_pin_view : styles.dontDisplayMe}
      >
        <Pressable
          onPress={() => {
            setPin(region);
            setDropPinDisplay(!dropPinDisplay);
            setSavePinDisplay(!savePinDisplay);
            setDisplayInput(!displayInput);
            console.log("set display input: " + displayInput);
          }}
        >
          <Text>
            <Ionicons name={"ios-pin-outline"} size={25} color={"black"} />
            mark pokemon location
          </Text>
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
          setPin(e.nativeEvent.coordinate);
        }}
      />
    ) : null;
  };

  const AutoCompletePoke = () => {
    console.log("AutoCompl Poke display input: " + displayInput);
    console.log("  ");
    const [MainJSON, setMainJSON] = useState([]);
    const [FilterData, setFilterData] = useState([]);
    const [selectedItem, setselectedItem] = useState({});

    const [mainContainerStyle, setMainContainerStyle] = useState(() => {
      if (displayInput) {
        return styles.MainContainer;
      } else {
        return { display: "none" };
      }
    });

    async function getPokeData<T>(): Promise<T> {
      // optimize me
      const response = await fetch(`${BASE_URL}?limit=1154`);
      const res = await response.json();
      setMainJSON(res.results);
    }

    useEffect(() => {
      getPokeData();
    }, []);

    const SearchDataFromJSON = (query) => {
      if (query) {
        //Making the Search as Case Insensitive.
        const regex = new RegExp(`${query.trim()}`, "i");
        setFilterData(MainJSON.filter((data) => data.name.search(regex) >= 0));
      } else {
        setFilterData([]);
      }
    };

    return (
      <View style={mainContainerStyle}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.AutocompleteStyle}
          data={FilterData}
          defaultValue={
            JSON.stringify(selectedItem) === "" ? "" : selectedItem.name
          }
          keyExtractor={(item, i) => i.toString()}
          onChangeText={(text) => {
            SearchDataFromJSON(text);
            setMainContainerStyle(styles.MainContaionerOnFocus);
          }}
          placeholder="start typing pokemon name..."
          flatListProps={{
            renderItem: ({ item }) => (
              <TouchableOpacity
                style={styles.input}
                onPress={() => {
                  setselectedItem(item);
                  setFilterData([]);
                  setPokemon(item);
                }}
              >
                <Text style={styles.SearchBoxTextItem}>{item.name}</Text>
              </TouchableOpacity>
            ),
          }}
        />

        <View style={styles.selectedTextContainer}>
          {
            <Text style={styles.selectedTextStyle}>
              {JSON.stringify(selectedItem)}
            </Text>
          }
        </View>
      </View>
    );
    //
  };

  return (
    <View style={styles.container}>
      <AutoCompletePoke />
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
        {markedLocations.map((l, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: l.latitude,
              longitude: l.longitude,
            }}
            description={l.name}
            pinColor={"blue"}
          />
        ))}
      </MapView>
      <View style={styles.drop_save_view}>
        <DropPin />
        <SavePin />
      </View>
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
  drop_pin_view: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderColor: pokeGrey,
    borderWidth: 1,
  },
  item: {
    width: 100,
  },
  drop_save_view: {
    width: "100%",
  },
  save_pin_view: {
    backgroundColor: "rgba(255, 255, 255, 0.7)",
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderColor: pokeGrey,
    borderWidth: 1,
  },
  dontDisplayMe: {
    display: "none",
  },
  MainContainer: {
    backgroundColor: "transparent",
    padding: 12,
    zIndex: 1,
    width: 300,
    height: 70,
    position: "absolute",
    top: 0,
  },
  MainContaionerOnFocus: {
    backgroundColor: "transparent",
    padding: 12,
    zIndex: 1,
    width: 300,
    height: 600,
    position: "absolute",
    top: 0,
  },
  AutocompleteStyle: {
    height: "100%",
  },
  SearchBoxTextItem: {
    margin: 5,
    fontSize: 16,
    paddingTop: 4,
  },
  selectedTextContainer: {
    flex: 1,
    justifyContent: "center",
  },
  selectedTextStyle: {
    textAlign: "center",
    fontSize: 18,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
  },
});
