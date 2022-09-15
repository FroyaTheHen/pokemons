import React, { useCallback, useState, useEffect } from "react";
import { Point } from "react-native-maps";
import { PokemonLocation } from "../pokemons/Pokemons";

interface PokemonsLocationsInterface {
  pokemonsLocations: Array<PokemonLocation>;
  addPokemonLocation: (point: Point, pokemonName: string) => void;
}

export const PokemonsLocationsContext =
  React.createContext<PokemonsLocationsInterface>({
    pokemonsLocations: [],
    addPokemonLocation: () => undefined,
  });

export function PokemonsLocationProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pokemonsLocations, setPokemonsLocations] = useState<
    Array<PokemonLocation>
  >([]);

  const addPokemonLocation = useCallback(
    (point: Point, pokemonName: string) => {
      const newPokemonLocation = { location: point, name: pokemonName };
      setPokemonsLocations([...pokemonsLocations, newPokemonLocation]);
      console.log("context: saved poke location" + newPokemonLocation);
      console.log(pokemonsLocations);
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
