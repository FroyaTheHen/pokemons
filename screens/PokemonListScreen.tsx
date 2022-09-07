import React, { useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  FlatList,
  Button,
  ActivityIndicator,
} from "react-native";

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
    <View style={styles.poke_button}>
      <Button
        onPress={() => {
          navigation.navigate("PokeDetails", { pokemon: item });
        }}
        title={item.name.toLocaleUpperCase()}
        color="black"
      />
    </View>
  );
  return base_pokemon_data ? (
    <View>
      <FlatList
        data={base_pokemon_data.results}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
      />
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
        <FlatList
          data={indexes}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  poke_button: {
    backgroundColor: "pink",
    margin: 10,
    padding: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: "80%",
  },
  text: {
    fontSize: 16,
  },
  wrapperCustom: {
    borderRadius: 8,
    padding: 6,
  },
});
