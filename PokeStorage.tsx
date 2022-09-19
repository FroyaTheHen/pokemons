import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pokemon } from "../pokemons/Pokemon";

export const savePokemonToFavourites = async (pokemon: Pokemon) => {
  try {
    const jsonValue = JSON.stringify(pokemon);
    await AsyncStorage.setItem(pokemon.name, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const retrieveAllFavouritesPokemons = async () => {
  try {
    const all_keys = await AsyncStorage.getAllKeys();
    const values = await AsyncStorage.multiGet([...all_keys]);
    return values;
  } catch (e) {
    console.log(e);
  }
};

export function parseToPokemonArray(data: any) {
  const pokemons: Array<Pokemon> = [];
  data.forEach((value) => {
    try {
      const pokemon = JSON.parse(value[1]);
      pokemons.push(pokemon);
    } catch (e) {
      console.log(e);
    }
  });
  return pokemons;
}

export const removePokemonFromFavourites = async (pokemon: Pokemon) => {
  try {
    await AsyncStorage.removeItem(pokemon.name);
  } catch (e) {
    console.log(e);
  }
};
