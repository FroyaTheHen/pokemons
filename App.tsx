import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { FavouritesPokemonProvider } from "./FavouritesContext";

import useCachedResources from "./hooks/useCachedResources";

import Navigation from "./navigation/";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <SafeAreaProvider>
        <FavouritesPokemonProvider>
          <Navigation />
          <StatusBar />
        </FavouritesPokemonProvider>
      </SafeAreaProvider>
    );
  }
}
