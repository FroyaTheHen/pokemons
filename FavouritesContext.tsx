import React, { useCallback, useState, useEffect } from "react";
import { Pokemon } from "./pokemons/Pokemons";
import {
  removePokemonFromFavourites,
  savePokemonToFavourites,
  retrieveAllFavouritesPokemons,
  parseToPokemonArray,
} from "./PokeStorage";

interface Pikapika {
  favouritesPokemons: Array<Pokemon>;
  isInFavourites: (pokemon: Pokemon) => boolean;
  addOrRemoveFromFavourites: (pokemon: Pokemon) => void;
}

export const FavouritesPokemonsContext = React.createContext<Pikapika>({
  favouritesPokemons: [],
  isInFavourites: () => false,
  addOrRemoveFromFavourites: () => undefined,
});

export function FavouritesPokemonProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [favouritesPokemons, setFavouritesPokemons] = useState<Array<Pokemon>>(
    []
  );

  useEffect(() => {
    retrieveAllFavouritesPokemons().then((poke) => {
      const pokemons: Array<Pokemon> = parseToPokemonArray(poke);
      setFavouritesPokemons(pokemons);
    });
  }, []);

  const isInFavourites = useCallback(
    (poke: Pokemon) => {
      return favouritesPokemons.some((p) => p.name === poke.name);
    },
    [favouritesPokemons]
  );

  const addOrRemoveFromFavourites = useCallback(
    (poke: Pokemon) => {
      isInFavourites(poke)
        ? (setFavouritesPokemons(
            favouritesPokemons.filter((p) => p.name != poke.name)
          ),
          removePokemonFromFavourites(poke))
        : (setFavouritesPokemons([...favouritesPokemons, poke]),
          savePokemonToFavourites(poke));
    },
    [favouritesPokemons, isInFavourites]
  );

  return (
    <FavouritesPokemonsContext.Provider
      value={{
        favouritesPokemons,
        isInFavourites,
        addOrRemoveFromFavourites,
      }}
    >
      {children}
    </FavouritesPokemonsContext.Provider>
  );
}
export default FavouritesPokemonsContext;
