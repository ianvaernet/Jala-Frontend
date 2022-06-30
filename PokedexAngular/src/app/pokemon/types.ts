export type Pokemon = {
  id: string;
  name: string;
  url: string;
  image: string;
  background: string;
};

type PokemonFromApi = { name: string; url: string };
export type ListPokemonsResult = { results: PokemonFromApi[] };
export type ListPokemonsByGenerationResult = {
  pokemon_species: PokemonFromApi[];
};
