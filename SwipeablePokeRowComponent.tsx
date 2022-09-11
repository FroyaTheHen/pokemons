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
    <GmailStyleSwipeableRow pokemon={item}>
      <Row item={item} navigation={navigation} index={index} />
    </GmailStyleSwipeableRow>
  );
};

export class Example extends Component {
  render() {
    return (
      <View>
        <FlatList
          data={this.props.data}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          renderItem={({ item, index }) => (
            <View>
              <Text>{"     " + index}</Text>
              <SwipeableRow
                item={item}
                index={index}
                navigation={this.props.navigation}
              ></SwipeableRow>
            </View>
          )}
          keyExtractor={(_item, index) => `message ${index}`}
          ListEmptyComponent={this.props.ListEmptyComponent}
          onEndReached={this.props.onEndReached}
          onEndReachedThreshold={0}
          ListFooterComponent={this.props.listFooterComponent}
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
    fontSize: 15,
    backgroundColor: "white",
  },
  separator: {
    backgroundColor: "rgb(200, 199, 204)",
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    backgroundColor: "transparent",
    textTransform: "capitalize",
  },
  xd: {
    backgroundColor: "pink",
  },
});
