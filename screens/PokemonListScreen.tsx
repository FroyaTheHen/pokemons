import React, { useEffect, useState } from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { View } from "../components/Themed";
import { RootTabScreenProps } from "../types";
import { BASE_URL } from "../pokemons/Pokemons";
import { Example } from "../SwipeablePokeRowComponent";

export default function TabPokemonListScreen({
  navigation,
}: RootTabScreenProps<"PokeDetails">) {
  const [pokeData, setPokeData] = useState([]);
  const [offset, setOffset] = useState(20);

  async function getPokeData<T>(): Promise<T> {
    const response = await fetch(
      `${BASE_URL}?limit=${offset}&offset=${offset}`
    );
    const res = await response.json();
    setPokeData(res.results);
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
    setOffset(offset + 20);
  };

  return pokeData ? (
    <View>
      <Example
        data={pokeData}
        navigation={navigation}
        ListEmptyComponent={renderLoader}
        onEndReached={loadMorePoke}
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
});
