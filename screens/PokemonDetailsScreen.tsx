import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useContext, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Pressable,
  Image,
  ActivityIndicator,
} from "react-native";
import { FavouritesPokemonsContext } from "../FavouritesContext";
import { fetchData, Pokemon } from "../pokemons/Pokemons";
import { RootTabParamList } from "../types";
import { useAsyncEffect } from "../utils";

import Ionicons from "react-native-vector-icons/Ionicons";
import { globalStyles } from "../Styles";

type Props = NativeStackScreenProps<RootTabParamList, "TabTwo">;

export default function TabPokemonDetailsScreen(params: Props) {
  const { validatePokemon, addFavouritesPokemon } = useContext(
    FavouritesPokemonsContext
  );

  const [pokemon, setPokemon] = useState<Pokemon>();

  useAsyncEffect(async () => {
    const _pokemon = await fetchData<Pokemon>(params.route.params.pokemon?.url);
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
          <Text style={globalStyles.poke_detail}>lorem ipsum</Text>
        </View>

        <View>
          <Text style={globalStyles.poke_detail}>weight: {pokemon.weight}</Text>
          <Text style={globalStyles.poke_detail}>
            base experience: {pokemon.base_experience}
          </Text>
        </View>
      </View>
      <Pressable
        style={globalStyles.pressable_wrapper}
        onPress={() => {
          addFavouritesPokemon(pokemon);
        }}
      >
        <Text>
          {validatePokemon(pokemon) ? "tak" : "nie"} add to favourites
          <Ionicons name={"ios-heart-outline"} size={25} color={"#545453"} />
        </Text>
      </Pressable>
    </SafeAreaView>
  ) : (
    <ActivityIndicator />
  );
}
