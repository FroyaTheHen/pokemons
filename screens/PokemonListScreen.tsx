import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { BASE_URL } from "../pokemons/Pokemons";
import { Example } from "../SwipeablePokeRowComponent";

const POKE_ON_PAGE_LIMIT: number = 20;

export default function TabPokemonListScreen({
  navigation,
}: RootTabScreenProps<"PokeDetails">) {
  const [pokeData, setPokeData] = useState([]);
  const [offset, setOffset] = useState(20);
  const [pokeDataCount, setPokeDataCount] = useState(21);

  async function getPokeData<T>(): Promise<T> {
    const response = await fetch(
      `${BASE_URL}?limit=${POKE_ON_PAGE_LIMIT}&offset=${offset}`
    );
    const res = await response.json();

    console.log(res.count);
    setPokeDataCount(res.count);
    setPokeData(pokeData.concat(res.results));
    return res.results;
  }

  useEffect(() => {
    getPokeData();
  }, [offset]);

  const renderLoader = () => {
    return (
      <View style={styles.loaderStyle}>
        <ActivityIndicator />
      </View>
    );
  };

  const loadMorePoke = () => {
    setOffset(offset + POKE_ON_PAGE_LIMIT);
    console.log(offset);
  };

  const listFooterComponent = () => {
    console.log(`offset = ${offset} // poke data count = ${pokeDataCount}`);

    return offset >= pokeDataCount ? (
      <View style={styles.rectButton}>
        <Text>Sorry Love, callected them all, already!</Text>
      </View>
    ) : (
      <View style={styles.loaderStyle}>
        <ActivityIndicator />
      </View>
    );
  };

  return pokeData ? (
    <View>
      <Example
        data={pokeData}
        navigation={navigation}
        ListEmptyComponent={renderLoader}
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
  loaderStyle: {
    marginVertical: 60,
    alignItems: "center",
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
