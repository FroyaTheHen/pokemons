import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useState } from "react";
import { StyleSheet, Image, ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { Text } from "../components/Themed";
import { fetchData, Pokemon } from "../pokemons/Pokemons";
import { RootTabParamList } from "../types";
import { useAsyncEffect } from "../utils";
type Props = NativeStackScreenProps<RootTabParamList, "TabTwo">;

export default function TabTwoScreen(params: Props) {
  const [pokemon, setPokemon] = useState<Pokemon>();

  useAsyncEffect(async () => {
    const _pokemon = await fetchData<Pokemon>(params.route.params.pokemon?.url);
    setPokemon(_pokemon);
  }, [params.route.params.pokemon]);

  return pokemon ? (
    <SafeAreaView style={styles.container}>
      <Image
        source={{
          uri: pokemon.sprites.front_shiny,
        }}
        style={{ width: 300, height: 300 }}
      />
      <Text style={styles.title}>{pokemon.name.toLocaleUpperCase()}</Text>
      <Text>height: {pokemon.height}</Text>
      <Text>weight: {pokemon.weight}</Text>
      <Text>base experience: {pokemon.base_experience}</Text>
    </SafeAreaView>
  ) : (
    <ActivityIndicator />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "pink",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
});
