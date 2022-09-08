import React, { useContext } from "react";
import { Text, FlatList } from "react-native";
import { FavouritesPokemonsContext } from "../FavouritesContext";
import { View } from "../components/Themed";
import { Pokemon } from "../pokemons/Pokemons";
import { globalStyles } from "../Styles";
import { AddOrRemoveComponent } from "../pokemons/AddOrRemoveComponent";

export default function TabPokemonFavouritesScreen() {
  const { favouritesPokemons } = useContext(FavouritesPokemonsContext);

  const Item = ({ poke }: { poke: Pokemon }) => (
    <View style={globalStyles.poke_button}>
      <View style={globalStyles.poke_details_container}>
        <View>
          <Text style={globalStyles.title}>{poke.name} </Text>
        </View>
        <View>
          <AddOrRemoveComponent poke={poke} />
        </View>
      </View>
    </View>
  );

  const renderItem = ({ item }: { item: Pokemon }) => <Item poke={item} />;

  return (
    <View style={globalStyles.whiteBack}>
      <FlatList data={favouritesPokemons} renderItem={renderItem} />
    </View>
  );
}
