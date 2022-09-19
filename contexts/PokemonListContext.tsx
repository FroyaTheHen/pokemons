import React, { useState, useEffect } from "react";
import { BASE_URL, Pokemon } from "../pokemons/Pokemons";

interface PokemonsListInterface {
  pokemonsList: Array<Pokemon>;
  createPokemonsList: (pokemonsList: Array<Pokemon>) => void;
}

export const PokemonsListContext = React.createContext<PokemonsListInterface>({
  pokemonsList: [],
  createPokemonsList: (pokemonsList: Array<Pokemon>) => undefined,
});

export function PokemonsListContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [pokemonsList, setPokemonsList] = useState<Array<Pokemon>>([]);

  useEffect(() => {
    getPokemonsList();
  }, []);

  const createPokemonsList = (_pokemonsList: Array<Pokemon>) => {
    setPokemonsList(_pokemonsList);
  };

  async function getPokemonsList() {
    const res = await fetch(`${BASE_URL}?limit=1154`);
    const response = await res.json();
    createPokemonsList(response.results);
  }

  return (
    <PokemonsListContext.Provider
      value={{
        pokemonsList,
      }}
    >
      {children}
    </PokemonsListContext.Provider>
  );
}

export default PokemonsListContext;
