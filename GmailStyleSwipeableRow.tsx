import { Ionicons } from "@expo/vector-icons";
import React, { Component, PropsWithChildren } from "react";
import { Animated, StyleSheet, I18nManager, View, Text } from "react-native";

import { RectButton } from "react-native-gesture-handler";

import Swipeable from "react-native-gesture-handler/Swipeable";
import { Pokemon } from "./pokemons/Pokemons";
import {
  isInFavourites,
  saveToOrRemoveFromFavourites,
} from "./storage/PokeStorage";
import { pokeGrey } from "./Styles";

const AnimatedView = Animated.createAnimatedComponent(View);

export default class GmailStyleSwipeableRow extends Component<
  PropsWithChildren<{ pokemon: Pokemon }>
> {
  private renderLeftActions = (
    _progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation
  ) => {
    const scale = dragX.interpolate({
      inputRange: [0, 80],
      outputRange: [0, 1],
      extrapolate: "clamp",
    });
    if (!isInFavourites(this.props.pokemon.name)) {
      return undefined;
    } else {
      return (
        <RectButton style={styles.leftAction} onPress={this.close}>
          <AnimatedView style={[styles.actionIcon, { transform: [{ scale }] }]}>
            <Text>
              <Ionicons name={"ios-heart-outline"} size={30} color={pokeGrey} />
            </Text>
          </AnimatedView>
        </RectButton>
      );
    }
  };

  private renderRightActions = (
    _progress: Animated.AnimatedInterpolation,
    dragX: Animated.AnimatedInterpolation
  ) => {
    const scale = dragX.interpolate({
      inputRange: [-80, 0],
      outputRange: [1, 0],
      extrapolate: "clamp",
    });
    if (!!isInFavourites(this.props.pokemon.name)) {
      return undefined;
    } else {
      return (
        <RectButton style={styles.rightAction} onPress={this.close}>
          <AnimatedView style={[styles.actionIcon, { transform: [{ scale }] }]}>
            <Text>
              <Ionicons name={"ios-heart"} size={30} color={pokeGrey} />
            </Text>
          </AnimatedView>
        </RectButton>
      );
    }
  };

  private swipeableRow?: Swipeable;

  private updateRef = (ref: Swipeable) => {
    this.swipeableRow = ref;
  };
  private close = () => {
    this.swipeableRow?.close();
  };

  addOrRemoveFromFavourites = () => {
    saveToOrRemoveFromFavourites(this.props.pokemon);
  };

  render() {
    const { children } = this.props;
    return (
      <Swipeable
        ref={this.updateRef}
        friction={2}
        leftThreshold={80}
        enableTrackpadTwoFingerGesture
        rightThreshold={40}
        onSwipeableOpen={this.addOrRemoveFromFavourites}
        renderLeftActions={this.renderLeftActions}
        renderRightActions={this.renderRightActions}
      >
        {children}
      </Swipeable>
    );
  }
}

const styles = StyleSheet.create({
  leftAction: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    flexDirection: I18nManager.isRTL ? "row" : "row-reverse",
  },
  actionIcon: {
    width: 120,
    marginHorizontal: 10,
    height: 40,
  },
  rightAction: {
    alignItems: "center",
    flexDirection: I18nManager.isRTL ? "row-reverse" : "row",
    flex: 1,
    justifyContent: "flex-end",
  },
});
