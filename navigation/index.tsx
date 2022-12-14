/**
 * If you are not familiar with React Navigation, refer to the "Fundamentals" guide:
 * https://reactnavigation.org/docs/getting-started
 *
 */
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import * as React from "react";
import TabPokemonListScreen from "../screens/PokemonListScreen";
import TabPokemonDetailsScreen from "../screens/PokemonDetailsScreen";
import TabPokemonFavouritesScreen from "../screens/PokemonFavouritesScreen";
import TabPokemonMapScreen from "../screens/PokemonMapScreen";
import LinkingConfiguration from "./LinkingConfiguration";

import Ionicons from "react-native-vector-icons/Ionicons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export function Navigation() {
  return (
    <NavigationContainer linking={LinkingConfiguration}>
      <PokeStackNavigator />
    </NavigationContainer>
  );
}

const PokeStack = createNativeStackNavigator<{
  PokeList: undefined;
  PokeDetails: undefined;
  PokeMap: undefined;
  PokeFavourites: undefined;
}>();

function PokeStackNavigator() {
  return (
    <PokeStack.Navigator>
      <PokeStack.Screen
        name="PokeList"
        component={TabPokemonListScreen}
        options={{ headerShown: false, title: "List" }}
      />
      <PokeStack.Screen
        name="PokeDetails"
        component={TabPokemonDetailsScreen}
        options={{ title: "Details" }}
      />
      <PokeStack.Screen
        name="PokeMap"
        component={TabPokemonMapScreen}
        options={{ title: "Map" }}
      />
    </PokeStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();

function TabNav() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "";

          if (route.name === "Favourites") {
            iconName = focused ? "ios-heart" : "ios-heart-outline";
          } else if (route.name === "List") {
            iconName = "ios-list-outline";
          } else if (route.name === "Map") {
            iconName = focused ? "ios-map" : "ios-map-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blck",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="List" component={PokeStackNavigator} />
      <Tab.Screen name="Favourites" component={TabPokemonFavouritesScreen} />
      <Tab.Screen name="Map" component={TabPokemonMapScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <TabNav />
    </NavigationContainer>
  );
}
