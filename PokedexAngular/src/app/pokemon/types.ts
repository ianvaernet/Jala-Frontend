export type Pokemon = {
  name: string;
  url: string;
  image: string;
  background: string;
};
export type PokemonFromApi = { name: string; url: string };
export type ListPokemonsResult = { results: PokemonFromApi[] };
