import React, { useCallback, useState } from "react";
import { Pokemon } from "./pokemons/Pokemons";

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

  const isInFavouritesContext = useCallback(
    (poke: Pokemon) => {
      return favouritesPokemons.some((p) => p.name === poke.name);
    },
    [favouritesPokemons]
  );

  const addOrRemoveFromFavourites = useCallback(
    (poke: Pokemon) => {
      isInFavouritesContext(poke)
        ? setFavouritesPokemons(
            favouritesPokemons.filter((p) => p.name != poke.name)
          )
        : setFavouritesPokemons([...favouritesPokemons, poke]);
    },
    [favouritesPokemons, isInFavouritesContext]
  );

  return (
    <FavouritesPokemonsContext.Provider
      value={{
        favouritesPokemons,
        isInFavouritesContext,
        addOrRemoveFromFavourites,
      }}
    >
      {children}
    </FavouritesPokemonsContext.Provider>
  );
}
export default FavouritesPokemonsContext;
