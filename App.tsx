import { StatusBar } from "expo-status-bar";
import React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { FavouritesPokemonProvider } from "./contexts/FavouritesContext";
import { PokemonsLocationProvider } from "./contexts/PokeLocationContext";

import useCachedResources from "./hooks/useCachedResources";

import Navigation from "./navigation/";

export default function App() {
  const isLoadingComplete = useCachedResources();

  if (!isLoadingComplete) {
    return null;
  } else {
    return (
      <GestureHandlerRootView style={{ flex: 1 }}>
        <SafeAreaProvider>
          <FavouritesPokemonProvider>
            <PokemonsLocationProvider>
              <Navigation />
              <StatusBar />
            </PokemonsLocationProvider>
          </FavouritesPokemonProvider>
        </SafeAreaProvider>
      </GestureHandlerRootView>
    );
  }
}
