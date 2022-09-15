import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pokemon } from "../pokemons/Pokemon";
import { PokemonLocation } from "./pokemons/Pokemons";

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
    const values = await AsyncStorage.multiGet([
      ...all_keys.filter((e) => e.slice(0, 16) != "POKEMON_LOCATION"),
    ]);
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

export const savePokemonLocationToStorage = async (
  pokemonLocation: PokemonLocation
) => {
  try {
    const jsonValue = JSON.stringify(pokemonLocation);
    // quite ugly this solution, so please come up with sth nicer later on ^^
    await AsyncStorage.setItem(
      "POKEMON_LOCATION" +
        pokemonLocation.latitude +
        "/" +
        pokemonLocation.longitude,
      jsonValue
    );
    console.log("storagde - done  --->   " + jsonValue);
  } catch (e) {
    console.log(e);
  }
};

export const retrieveAllPokemonsLocations = async () => {
  try {
    const all_keys = await AsyncStorage.getAllKeys();
    const values = await AsyncStorage.multiGet([
      ...all_keys.filter((e) => e.slice(0, 16) == "POKEMON_LOCATION"),
    ]);
    return values;
  } catch (e) {
    console.log(e);
  }
};

export function parseToPokemonLocationsArray(data: any) {
  const allPokemonLocations: Array<PokemonLocation> = [];
  data.forEach((value) => {
    try {
      const pokemonLocation = JSON.parse(value[1]);
      allPokemonLocations.push(pokemonLocation);
    } catch (e) {
      console.log(e);
    }
  });
  return allPokemonLocations;
}
