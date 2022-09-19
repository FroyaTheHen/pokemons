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

export default function TabPokemonMapScreen({
  navigation,
}: {
  navigation: any;
}) {
  const { pokemonsLocations, addPokemonLocation } = useContext(
    PokemonsLocationsContext
  );

  const [markedLocations, setMarkedLocations] = useState(pokemonsLocations);

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
        <AutoCompletePoke />
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
      <View
        style={dropPinDisplay ? styles.drop_pin_view : styles.dontDisplayMe}
      >
        <Pressable
          onPress={() => {
            setPin(region);
            setDropPinDisplay(!dropPinDisplay);
            setSavePinDisplay(!savePinDisplay);
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
          setPin(e.nativeEvent.coordinate);
        }}
      />
    ) : null;
  };

  const AutoCompletePoke = () => {
    const [MainJSON, setMainJSON] = useState([]);
    const [FilterData, setFilterData] = useState([]);
    const [selectedItem, setselectedItem] = useState({});

    async function getPokeData<T>(): Promise<T> {
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
      <View style={styles.MainContainer}>
        <Autocomplete
          autoCapitalize="none"
          autoCorrect={false}
          containerStyle={styles.AutocompleteStyle}
          data={FilterData}
          defaultValue={
            JSON.stringify(selectedItem) === "{}" ? "" : selectedItem.name
          }
          keyExtractor={(item, i) => i.toString()}
          onChangeText={(text) => SearchDataFromJSON(text)}
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
    backgroundColor: "white",
    flexDirection: "row",
    height: 30,
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  item: {
    width: 100,
  },
  drop_save_view: {},
  save_pin_view: {
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    flexDirection: "row",
    width: "100%",
    height: 100,
  },
  dontDisplayMe: {
    display: "none",
  },
  MainContainer: {
    backgroundColor: "transparent",
    flex: 1,
    padding: 12,
  },
  AutocompleteStyle: {
    flex: 1,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0,
    zIndex: 1,
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
  input: {},
});
