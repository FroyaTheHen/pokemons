import React, { Component, useState } from "react";
import { StyleSheet, Text, View, I18nManager } from "react-native";

import { FlatList, RectButton } from "react-native-gesture-handler";

import GmailStyleSwipeableRow from "./GmailStyleSwipeableRow";
import { PokemonBaseResource, fetchData } from "./pokemons/Pokemons";
import { useAsyncEffect } from "./utils";
// import { usePokemonList } from "./screens/PokemonListScreen";

//  To toggle LTR/RTL change to `true`
I18nManager.allowRTL(false);

export type PokeRow = {
  name: string;
  url: string;
};

const Row = ({ item }: { item: PokeRow }) => (
  // eslint-disable-next-line no-alert
  <RectButton style={styles.rectButton}>
    <Text style={styles.fromText}>{item.name}</Text>
  </RectButton>
);

const SwipeableRow = ({ item, index }: { item: PokeRow; index: number }) => {
  return (
    <GmailStyleSwipeableRow>
      <Row item={item} />
    </GmailStyleSwipeableRow>
  );
  // }
};

export class Example extends Component {
  data: PokeRow[];

  constructor(data: any) {
    super();
    this.data = data;
  }

  render() {
    console.log("ooops");
    console.log(this.data.data);
    return (
      <View>
        <FlatList
          data={this.data.data}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item, index }) => (
            <SwipeableRow item={item} index={index} />
          )}
          keyExtractor={(_item, index) => `message ${index}`}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: "space-between",
    flexDirection: "column",
    backgroundColor: "white",
  },
  separator: {
    backgroundColor: "rgb(200, 199, 204)",
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    fontWeight: "bold",
    backgroundColor: "transparent",
  },
  messageText: {
    color: "#999",
    backgroundColor: "transparent",
  },
  dateText: {
    backgroundColor: "transparent",
    position: "absolute",
    right: 20,
    top: 10,
    color: "#999",
    fontWeight: "bold",
  },
});
