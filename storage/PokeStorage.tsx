import AsyncStorage from "@react-native-async-storage/async-storage";
import { Pokemon } from "../pokemons/Pokemons";

export const savePokemonToFavourites = async (pokemon: Pokemon) => {
  try {
    // store values with some meaning so the Storage can be used in different cases as well
    pokemon.object_type_storage_id = "FAVOURITE_POKEMON";
    const jsonValue = JSON.stringify(pokemon);
    await AsyncStorage.setItem(pokemon.name, jsonValue);
  } catch (e) {
    // saving error
    console.log(e);
  }
};

export const retrieveFavouritePokemon = async (pokemonName: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(pokemonName);
    if (jsonValue != null) {
      const pokemon: Pokemon = JSON.parse(jsonValue);
      return pokemon;
    } else {
      return null;
    }
  } catch (e) {}
};

export const retrieveAllFavouritesPokemons = async () => {
  try {
    // safe only as long as the only objects saved to the storage are favoruite pokemons
    // the logic must be refined to make the storage reusable
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

export async function isInFavourites(pokemonName: string) {
  try {
    const pokemon = await AsyncStorage.getItem(pokemonName);
    return pokemon ? true : false;
  } catch (e) {
    console.log(e);
  }
}

export const saveToOrRemoveFromFavourites = async (pokemon: Pokemon) => {
  let _isInFavourites: any = await isInFavourites(pokemon.name);
  if (_isInFavourites) {
    try {
      await AsyncStorage.removeItem(pokemon.name);
    } catch (e) {
      console.log(e);
    }
  } else {
    savePokemonToFavourites(pokemon);
  }
};
