import React from "react";
import { ActivityIndicator, StyleSheet } from "react-native";
import { View } from "../components/Themed";

export const PokeActivityIndicator = () => {
  return (
    <View style={styles.loaderStyle}>
      <ActivityIndicator />
    </View>
  );
};

const styles = StyleSheet.create({
  loaderStyle: {
    marginVertical: 60,
    alignItems: "center",
  },
});
