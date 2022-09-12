import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  ActivityIndicator,
} from "react-native";
import { fetchData, Pokemon } from "../pokemons/Pokemons";
import { RootTabParamList } from "../types";
import { useAsyncEffect } from "../utils";
import { globalStyles } from "../Styles";
import { AddOrRemoveComponent } from "../pokemons/AddOrRemoveComponent";
type Props = NativeStackScreenProps<RootTabParamList, "PokeDetails">;

export default function TabPokemonDetailsScreen(params: Props) {
  const [pokemon, setPokemon] = useState<Pokemon>();

  useAsyncEffect(async () => {
    const _pokemon = await fetchData<Pokemon>(params.route.params.pokemon.url);
    setPokemon(_pokemon);
  }, [params.route.params.pokemon]);

  return pokemon ? (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.title}>{pokemon.name.toLocaleUpperCase()}</Text>

      <Image
        source={{
          uri: pokemon.sprites.front_shiny,
        }}
        style={{ width: 300, height: 300 }}
      />

      <View style={globalStyles.poke_details_container}>
        <View>
          <Text style={globalStyles.poke_detail}>height: {pokemon.height}</Text>
          <Text style={globalStyles.poke_detail}>lorem ipsum {pokemon.id}</Text>
        </View>

        <View>
          <Text style={globalStyles.poke_detail}>weight: {pokemon.weight}</Text>
          <Text style={globalStyles.poke_detail}>
            base experience: {pokemon.base_experience}
          </Text>
        </View>
      </View>
      <AddOrRemoveComponent poke={pokemon} />
    </SafeAreaView>
  ) : (
    <ActivityIndicator />
  );
}
