import React, { useCallback, useState, useEffect } from "react";
import { Point } from "react-native-maps";
import { PokemonLocation } from "../pokemons/Pokemons";
import {
  savePokemonLocationToStorage,
  retrieveAllPokemonsLocations,
  parseToPokemonLocationsArray,
} from "../PokeStorage";

interface PokemonsLocationsInterface {
  pokemonsLocations: Array<PokemonLocation>;
  addPokemonLocation: (newPokemonLocation: PokemonLocation) => void;
}

export const PokemonsLocationsContext =
  React.createContext<PokemonsLocationsInterface>({
    pokemonsLocations: [],
    addPokemonLocation: (newPokemonLocation: PokemonLocation) => undefined,
  });

export function PokemonsLocationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pokemonsLocations, setPokemonsLocations] = useState<
    Array<PokemonLocation>
  >([]);

  useEffect(() => {
    retrieveAllPokemonsLocations().then((data) => {
      const allPokemonsLocations: Array<PokemonLocation> =
        parseToPokemonLocationsArray(data);
      setPokemonsLocations(allPokemonsLocations);
    });
  }, []);

  const addPokemonLocation = useCallback(
    (newPokemonLocation: PokemonLocation) => {
      setPokemonsLocations([...pokemonsLocations, newPokemonLocation]);
      console.log(pokemonsLocations);
      savePokemonLocationToStorage(newPokemonLocation);

      // console.log(
      //   "context: saved poke location: " +
      //     newPokemonLocation.name +
      //     " / " +
      //     newPokemonLocation.latitude +
      //     " / " +
      //     newPokemonLocation.longitude +
      //     "   /   " +
      //     JSON.stringify(newPokemonLocation)
      // );
    },
    [pokemonsLocations]
  );

  return (
    <PokemonsLocationsContext.Provider
      value={{
        pokemonsLocations,
        addPokemonLocation,
      }}
    >
      {children}
    </PokemonsLocationsContext.Provider>
  );
}

export default PokemonsLocationsContext;
