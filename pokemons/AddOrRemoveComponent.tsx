import React, { useContext } from "react";
import { Text, Pressable } from "react-native";

import Ionicons from "react-native-vector-icons/Ionicons";
import { FavouritesPokemonsContext } from "../FavouritesContext";
import { saveToOrRemoveFromFavourites } from "../storage/PokeStorage";
import { pokeGrey } from "../Styles";
import { Pokemon } from "./Pokemons";

export const AddOrRemoveComponent = ({ poke }: { poke: Pokemon }) => {
  const { addOrRemoveFromFavourites, isInFavourites } = useContext(
    FavouritesPokemonsContext
  );
  return (
    <Pressable
      onPress={() => {
        saveToOrRemoveFromFavourites(poke);
      }}
    >
      <Text>
        {isInFavourites(poke) ? (
          <Ionicons name={"ios-heart"} size={25} color={pokeGrey} />
        ) : (
          <Ionicons name={"ios-heart-outline"} size={25} color={pokeGrey} />
        )}
      </Text>
    </Pressable>
  );
};
