import React, { useEffect, useState } from "react";
import { Text, FlatList, Pressable, ActivityIndicator } from "react-native";
import { View } from "../components/Themed";

import { Pokemon } from "../pokemons/Pokemons";
import { globalStyles, pokeGrey } from "../Styles";
import { AddOrRemoveComponent } from "../pokemons/AddOrRemoveComponent";

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
    return (
      <View>
        <Pressable
          style={({ pressed }) => [
            {
              backgroundColor: pressed ? pokeGrey : "white",
            },
            globalStyles.poke_button,
          ]}
          onPress={() => {
            navigation.navigate("PokeDetails", { pokemon: poke });
          }}
        >
          <Text style={globalStyles.title}>{poke.name}</Text>

          <AddOrRemoveComponent poke={poke} />
        </Pressable>
      </View>
    );
  };

  const renderItem = ({ item }: { item: Pokemon }) => <Item poke={item} />;

  return <FavPoke></FavPoke>;
}
