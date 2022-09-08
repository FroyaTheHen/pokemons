import React, { useState } from "react";
import { FlatList, ActivityIndicator, Pressable, Text } from "react-native";
import { globalStyles, pokeGrey } from "../Styles";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import {
  Pokemon,
  fetchData,
  PokemonBaseResource,
  URL,
} from "../pokemons/Pokemons";
import { useAsyncEffect } from "../utils";

function usePokemonList() {
  const [data, setData] = useState<PokemonBaseResource>();

  useAsyncEffect(async () => {
    const dataR = await fetchData<PokemonBaseResource>(URL);
    setData(dataR);
  }, []);

  return data;
}

export default function TabPokemonListScreen({
  navigation,
}: RootTabScreenProps<"PokeDetails">) {
  const base_pokemon_data = usePokemonList();

  const renderPokemon = ({ item }: { item: Pokemon }) => (
    <View>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? pokeGrey : "white",
          },
          globalStyles.poke_button,
        ]}
        onPress={() => {
          navigation.navigate("PokeDetails", { pokemon: item });
        }}
      >
        <Text style={globalStyles.title}>{item.name}</Text>
      </Pressable>
    </View>
  );

  return base_pokemon_data ? (
    <View>
      <FlatList data={base_pokemon_data.results} renderItem={renderPokemon} />
    </View>
  ) : (
    <ActivityIndicator />
  );
}
