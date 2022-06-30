export type Pokemon = {
  id: string;
  name: string;
  url: string;
  image: string;
  background: string;
};

export type PokemonDetails = {
  abilities: unknown[];
  base_experience: number;
  forms: unknown[];
  game_indices: unknown[];
  height: number;
  held_items: unknown[];
  id: number;
  is_default: boolean;
  location_area_encounters: string;
  moves: unknown[];
  name: string;
  order: number;
  past_types: unknown[];
  species: unknown;
  sprites: unknown;
  stats: unknown[];
  weight: number;
};

type PokemonFromApi = { name: string; url: string };

export type ListPokemonsResult = { results: PokemonFromApi[] };

export type ListPokemonsByGenerationResult = {
  pokemon_species: PokemonFromApi[];
};
