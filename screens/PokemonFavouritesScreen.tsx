import React, { useEffect, useState } from "react";
import {
  Text,
  FlatList,
  Pressable,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { View } from "../components/Themed";

import Ionicons from "react-native-vector-icons/Ionicons";
import { Pokemon } from "../pokemons/Pokemons";
import { globalStyles, pokeGrey } from "../Styles";

import { RootTabScreenProps } from "../types";
import {
  parseToPokemonArray,
  retrieveAllFavouritesPokemons,
} from "../storage/PokeStorage";

export default function TabPokemonFavouritesScreen({
  navigation,
}: RootTabScreenProps<"PokeDetails">) {
  const FavPoke = () => {
    const [favpoke, setFavpoke] = useState([]);

    useEffect(() => {
      retrieveAllFavouritesPokemons().then((poke) => {
        const pokemons: Array<Pokemon> = parseToPokemonArray(poke);
        setFavpoke(pokemons);
      });
    }, []);

    if (!favpoke) return <ActivityIndicator />;

    return (
      <View style={globalStyles.whiteBack}>
        <FlatList
          data={favpoke}
          renderItem={renderItem}
          ItemSeparatorComponent={() => <View style={globalStyles.separator} />}
        />
      </View>
    );
  };

  const Item = ({ poke }: { poke: Pokemon }) => {
    const [statusChanged, setStatusChanged] = useState(style.poke_button);

    const Component = () => {
      return (
        <View>
          <Pressable
            onPress={() => {
              setStatusChanged(style.hide_poke_button);
            }}
          >
            <Text>
              {<Ionicons name={"ios-heart"} size={25} color={pokeGrey} />}
            </Text>
          </Pressable>
        </View>
      );
    };

    return (
      <View>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? pokeGrey : "white",
            },
            statusChanged,
          ]}
          onPress={() => {
            navigation.navigate("PokeDetails", { pokemon: poke });
          }}
        >
          <Text style={globalStyles.title}>{poke.name}</Text>
          <Component />
        </Pressable>
      </View>
    );
  };

  const renderItem = ({ item }: { item: Pokemon }) => <Item poke={item} />;

  return <FavPoke></FavPoke>;
}

export const style = StyleSheet.create({
  poke_button: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    fontWeight: "bold",
    justifyContent: "center",
    alignItems: "center",
  },
  hide_poke_button: {
    display: "none",
  },
});
