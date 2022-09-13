import React, { useEffect, useState } from "react";
import { Text, Pressable, ActivityIndicator } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { View } from "../components/Themed";
import {
  saveToOrRemoveFromFavourites,
  isInFavourites,
} from "../storage/PokeStorage";
import { pokeGrey } from "../Styles";
import { Pokemon } from "./Pokemons";

export const AddOrRemoveComponent = ({ poke }: { poke: Pokemon }) => {
  const [isPokemonInFavourites, setIsPokemonInFavourites] = useState();

  const getIsPokemonInFavourites = async () => {
    let _isPokemonInFavourites = await isInFavourites(poke.name);
    const isItTho = await _isPokemonInFavourites;
    setIsPokemonInFavourites(isItTho);
  };

  useEffect(() => {
    getIsPokemonInFavourites();
  }, []);

  useEffect(() => {
    RenderPressable();
  }, [isPokemonInFavourites]);

  const getIcon = () => {
    if (isPokemonInFavourites == undefined) {
      return "";
    } else {
      return isPokemonInFavourites ? "ios-heart" : "ios-heart-outline";
    }
  };

  const RenderPressable = () => {
    if (isPokemonInFavourites == undefined) {
      return <ActivityIndicator />;
    } else {
      return (
        <View>
          <Pressable
            onPress={() => {
              saveToOrRemoveFromFavourites(poke);
              setIsPokemonInFavourites(!isPokemonInFavourites);
            }}
          >
            <Text>
              {<Ionicons name={getIcon()} size={25} color={pokeGrey} />}
            </Text>
          </Pressable>
        </View>
      );
    }
  };

  return <RenderPressable></RenderPressable>;
};
