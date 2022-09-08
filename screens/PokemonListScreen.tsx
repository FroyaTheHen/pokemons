import React, { useState } from "react";
import {
  SafeAreaView,
  FlatList,
  ActivityIndicator,
  Pressable,
  Text,
} from "react-native";
import { globalStyles } from "../Styles";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import {
  Pokemon,
  fetchData,
  generateIndexes,
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

function TabPokemonListItem({
  navigation,
}: {
  navigation: RootTabScreenProps<"TabOne">["navigation"];
}) {
  const base_pokemon_data = usePokemonList();

  const renderItem = ({ item }: { item: Pokemon }) => (
    <View style={globalStyles.poke_button}>
      <Pressable
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
      <FlatList data={base_pokemon_data.results} renderItem={renderItem} />
    </View>
  ) : (
    <ActivityIndicator />
  );
}

export default function TabPokemonListScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const renderItem = ({ item }: { item: number }) => (
    <TabPokemonListItem navigation={navigation} />
  );
  const indexes: number[] = generateIndexes();

  return (
    <SafeAreaView>
      <View>
        <FlatList data={indexes} renderItem={renderItem} />
      </View>
    </SafeAreaView>
  );
}
