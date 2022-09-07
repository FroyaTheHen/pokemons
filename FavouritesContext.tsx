import React, { useCallback, useState } from "react";
import { Pokemon } from "./pokemons/Pokemons";

interface Pikapika {
  favouritesPokemons: Array<Pokemon>;
  addFavouritesPokemon: (pokemon: Pokemon) => void;
  deleteFavouritePokemon: (pokemon: Pokemon) => void;
  validatePokemon: (pokemon: Pokemon) => boolean;
}

export const FavouritesPokemonsContext = React.createContext<Pikapika>({
  favouritesPokemons: [],
  addFavouritesPokemon: () => undefined,
  deleteFavouritePokemon: () => undefined,
  validatePokemon: () => false,
});

export function FavouritesPokemonProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favouritesPokemons, setFavouritesPokemons] = useState<Array<Pokemon>>(
    []
  );

  const validatePokemon = useCallback(
    (poke: Pokemon) => {
      return favouritesPokemons.some((p) => p.name === poke.name);
    },
    [favouritesPokemons]
  );

  const addFavouritesPokemon = useCallback(
    (poke: Pokemon) => {
      if (!validatePokemon(poke)) {
        setFavouritesPokemons([...favouritesPokemons, poke]);
      }
    },
    [favouritesPokemons, validatePokemon]
  );

  const deleteFavouritePokemon = useCallback(
    (poke: Pokemon) => {
      if (validatePokemon(poke)) {
        setFavouritesPokemons(favouritesPokemons.filter((p) => p != poke));
      }
    },
    [favouritesPokemons, validatePokemon]
  );

  return (
    <FavouritesPokemonsContext.Provider
      value={{
        favouritesPokemons,
        validatePokemon,
        addFavouritesPokemon,
        deleteFavouritePokemon,
      }}
    >
      {children}
    </FavouritesPokemonsContext.Provider>
  );
}
export default FavouritesPokemonsContext;
