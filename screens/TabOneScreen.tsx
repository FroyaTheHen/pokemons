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

function TabOneScreenItem({
  navigation,
}: {
  navigation: RootTabScreenProps<"TabOne">["navigation"];
}) {
  const base_pokemon_data = usePokemonList();

  const renderItem = ({ item }: { item: Pokemon }) => (
    <SafeAreaView>
      <Button
        onPress={() => {
          navigation.navigate("PokeDetails", { pokemon: item });
        }}
        title={item.name.toLocaleUpperCase()}
      />
    </SafeAreaView>
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

export default function TabOneScreen({
  navigation,
}: RootTabScreenProps<"TabOne">) {
  const renderItem = ({ item }: { item: number }) => (
    <TabOneScreenItem navigation={navigation} />
  );
  const indexes: number[] = generateIndexes();

  return (
    <SafeAreaView style={styles.container}>
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
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
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
  pokemon_card: {
    flex: 0.3,
    borderWidth: 0,
    backgroundColor: "pink",
    borderRadius: 20,
    marginBottom: 10,
  },
});
