import React, { useContext } from "react";
import { Text, FlatList, Pressable } from "react-native";
import { FavouritesPokemonsContext } from "../FavouritesContext";
import { View } from "../components/Themed";
import { Pokemon } from "../pokemons/Pokemons";
import { globalStyles, pokeGrey } from "../Styles";
import { AddOrRemoveComponent } from "../pokemons/AddOrRemoveComponent";
import { styles } from "../SwipeablePokeRowComponent";

import { RootTabScreenProps } from "../types";

export default function TabPokemonFavouritesScreen({
  navigation,
}: RootTabScreenProps<"PokeDetails">) {
  const { favouritesPokemons } = useContext(FavouritesPokemonsContext);

  const Item = ({ poke }: { poke: Pokemon }) => (
    <View>
      <Pressable
        style={({ pressed }) => [
          {
            backgroundColor: pressed ? pokeGrey : "white",
          },
          globalStyles.poke_button,
        ]}
        onPress={() => {
          navigation.navigate("PokeDetails", { pokemon: poke });
        }}
      >
        <Text style={globalStyles.title}>{poke.name}</Text>

        <AddOrRemoveComponent poke={poke} />
      </Pressable>
    </View>
  );

  const renderItem = ({ item }: { item: Pokemon }) => <Item poke={item} />;

  return (
    <View style={globalStyles.whiteBack}>
      <FlatList
        data={favouritesPokemons}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
}
