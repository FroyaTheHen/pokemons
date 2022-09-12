import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  View,
  SafeAreaView,
  Text,
  Image,
  ActivityIndicator,
  Pressable,
} from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { fetchData, Pokemon } from "../pokemons/Pokemons";
import { RootTabParamList } from "../types";
import { useAsyncEffect } from "../utils";
import { globalStyles, pokeGrey } from "../Styles";
import { AddOrRemoveComponent } from "../pokemons/AddOrRemoveComponent";
type Props = NativeStackScreenProps<RootTabParamList, "PokeDetails">;

export default function TabPokemonDetailsScreen(params: Props) {
  const [pokemon, setPokemon] = useState<Pokemon>();
  const [gender, setGender] = useState("M");
  const pokeUrl = params.route.params.pokemon.url;

  const changeGender = () => {
    gender === "M" ? setGender("F") : setGender("M");
  };

  const getPokeImg = () => {
    return gender === "M"
      ? pokemon?.sprites.front_shiny
      : pokemon?.sprites.front_shiny_female;
  };

  useEffect(() => {
    getPokeImg();
  }, [gender]);

  useAsyncEffect(async () => {
    const _pokemon = await fetchData<Pokemon>(pokeUrl);
    _pokemon.url = pokeUrl;
    setPokemon(_pokemon);
  }, [params.route.params.pokemon]);

  return pokemon ? (
    <SafeAreaView style={globalStyles.container}>
      <Text style={globalStyles.title}>{pokemon.name.toLocaleUpperCase()}</Text>

      <Image
        source={{
          uri: getPokeImg(),
        }}
        style={{ width: 300, height: 300 }}
      />
      <Pressable onPress={changeGender}>
        <Text>
          <Ionicons
            name={"ios-male"}
            size={25}
            color={gender === "M" ? "black" : pokeGrey}
          />
          <Ionicons
            name={"ios-female"}
            size={25}
            color={gender === "F" ? "black" : pokeGrey}
          />
        </Text>
      </Pressable>

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
