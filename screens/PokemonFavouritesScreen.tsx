import React, { useContext } from "react";
import {
  SafeAreaView,
  Text,
  FlatList,
  Pressable,
} from "react-native";
import { FavouritesPokemonsContext } from "../FavouritesContext";
import { View } from "../components/Themed";
import { Pokemon } from "../pokemons/Pokemons";
import Ionicons from "react-native-vector-icons/Ionicons";
import { globalStyles } from "../Styles";

export default function TabPokemonFavouritesScreen() {
  const { favouritesPokemons, deleteFavouritePokemon } = useContext(
    FavouritesPokemonsContext
  );

  const Item = ({ poke }: { item: Pokemon }) => (
    <View style={globalStyles.poke_button}>
      <Text style={globalStyles.title}>{poke.name} </Text>
      <Pressable
        onPress={() => {
          deleteFavouritePokemon(poke);
        }}
      >
        <Text>
          remove from favouries
          <Ionicons name={"ios-trash"} size={25} color={"#545453"} />
        </Text>
      </Pressable>
    </View>
  );

  const renderItem = ({ item }: { item: Pokemon }) => <Item poke={item} />;

  return (
    <SafeAreaView>
      <FlatList data={favouritesPokemons} renderItem={renderItem} />
    </SafeAreaView>
  );
}
