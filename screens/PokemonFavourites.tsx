import React, { useContext } from "react";
import { SafeAreaView, Text, Button, FlatList, StyleSheet } from "react-native";
import { FavouritesPokemonsContext } from "../FavouritesContext";
import { View } from "../components/Themed";
import { Pokemon } from "../pokemons/Pokemons";

export default function TabPokemonFavouritesScreen() {
  const { favouritesPokemons, deleteFavouritePokemon } = useContext(
    FavouritesPokemonsContext
  );

  const Item = ({ poke }: { item: Pokemon }) => (
    <View style={styles.poke_button}>
      <Text style={styles.title}>{poke.name}</Text>
      <Button
        onPress={() => {
          deleteFavouritePokemon(poke);
        }}
        title={"remove"}
        color="black"
      />
    </View>
  );

  const renderItem = ({ item }: { item: Pokemon }) => <Item poke={item} />;

  return (
    <SafeAreaView>
      <FlatList data={favouritesPokemons} renderItem={renderItem} />
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
    textTransform: "uppercase",
  },
});
