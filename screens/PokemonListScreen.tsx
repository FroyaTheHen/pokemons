import React, { useContext, useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { BASE_URL } from "../pokemons/Pokemons";
import { Example } from "../SwipeablePokeRowComponent";
import { PokeActivityIndicator } from "../commonComponents/pokeActivityIndicator";
import PokemonsListContext from "../contexts/PokemonListContext";

const POKE_ON_PAGE_LIMIT: number = 20;

export default function TabPokemonListScreen({
  navigation,
}: RootTabScreenProps<"PokeDetails">) {
  const [pokeData, setPokeData] = useState([]);
  const [offset, setOffset] = useState(20);
  const [pokeDataCount, setPokeDataCount] = useState(21);

  const { pokemonsList } = useContext(PokemonsListContext);

  async function getPokeData<T>(): Promise<T> {
    if (!pokemonsList.length) {
      const response = await fetch(
        `${BASE_URL}?limit=${POKE_ON_PAGE_LIMIT}&offset=${offset}`
      );
      const res = await response.json();
      // consider updating number of reults only once at the begining
      setPokeDataCount(res.count);
      setPokeData(pokeData.concat(res.results));
      return res.results;
    } else {
      let pd = pokemonsList.slice(0, offset);
      setPokeData(pd);
    }
  }

  useEffect(() => {
    getPokeData();
  }, [offset]); // eslint-disable-line

  const loadMorePoke = () => {
    setOffset(offset + POKE_ON_PAGE_LIMIT);
  };

  const listFooterComponent = () => {
    return offset >= pokeDataCount ? (
      <View style={styles.rectButton}>
        <Text>Sorry Love, caught them all!</Text>
      </View>
    ) : (
      <PokeActivityIndicator />
    );
  };

  return pokeData ? (
    <View>
      <Example
        data={pokeData}
        navigation={navigation}
        onEndReached={loadMorePoke}
        listFooterComponent={listFooterComponent}
      ></Example>
    </View>
  ) : (
    <ActivityIndicator />
  );
}

const styles = StyleSheet.create({
  itemWrapperStyle: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 16,
    borderColor: "#ddd",
  },
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "column",
    fontWeight: "bold",
    fontSize: 15,
  },
});
