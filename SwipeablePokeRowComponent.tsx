import React, { Component } from "react";
import { StyleSheet, Text, View, I18nManager } from "react-native";

import { FlatList, RectButton } from "react-native-gesture-handler";

import GmailStyleSwipeableRow from "./GmailStyleSwipeableRow";
import { Pokemon } from "./pokemons/Pokemons";
import { globalStyles } from "./Styles";

//  To toggle LTR/RTL change to `true`
I18nManager.allowRTL(false);

const Row = ({ item, navigation }: { item: Pokemon; navigation: any }) => (
  // eslint-disable-next-line no-alert
  <RectButton
    style={(styles.rectButton, globalStyles.poke_button)}
    onPress={async () => {
      navigation.navigate("PokeDetails", { pokemon: item });
    }}
  >
    <Text style={styles.fromText}>{item.name}</Text>
  </RectButton>
);

const SwipeableRow = ({
  item,
  index,
  navigation,
}: {
  item: Pokemon;
  index: number;
  navigation: object;
}) => {
  return (
    <GmailStyleSwipeableRow>
      <Row item={item} navigation={navigation} />
    </GmailStyleSwipeableRow>
  );
};

export class Example extends Component {
  data: Pokemon[];
  navigation: any;

  constructor(data: any, navigation: any) {
    super();
    this.data = data;
    this.navigation = navigation;
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.data.data}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item, index }) => (
            <SwipeableRow
              item={item}
              index={index}
              navigation={this.props.navigation}
            />
          )}
          keyExtractor={(_item, index) => `message ${index}`}
        />
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    flexDirection: "column",
    fontWeight: "bold",
  },
  separator: {
    backgroundColor: "rgb(200, 199, 204)",
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    backgroundColor: "transparent",

    textTransform: "capitalize",
  },
  // messageText: {
  //   color: "#999",
  //   backgroundColor: "transparent",
  // },
  // dateText: {
  //   backgroundColor: "transparent",
  //   position: "absolute",
  //   right: 20,
  //   top: 10,
  //   color: "#999",
  //   fontWeight: "bold",
  // },
});
