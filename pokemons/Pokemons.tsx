export const URL = "https://pokeapi.co/api/v2/pokemon?limit=10&offset=0";
const DEFAULT_NUMBER_OF_POKEMONS = 6;
export const BASE_URL = "https://pokeapi.co/api/v2/pokemon";

interface PokemonSprites {
  back_default: string;
  front_shiny: string;
  back_shiny: string;
}

export interface Pokemon {
  id: number;
  name: string;
  url: string;
  sprites: PokemonSprites;
  height: number;
  weight: number;
  base_experience: number;
}

interface PokeBase {
  name: string;
  url: string;
}

export interface PokemonBaseResource {
  count: number;
  next: string;
  previous: any;
  results: Array<PokeBase>;
}
export async function fetchData<T>(resourceUrl: string): Promise<T> {
  const response = await fetch(resourceUrl);
  // fetching the reponse body data
  return await response.json();
}

export function generateIndexes(count: number = DEFAULT_NUMBER_OF_POKEMONS) {
  let indexes: number[] = [];
  let randomIndex: number;

  for (let i = 1; i <= count; i++) {
    randomIndex = Math.floor(Math.random() * 1154);
    indexes.push(randomIndex);
  }
  return indexes;
}
