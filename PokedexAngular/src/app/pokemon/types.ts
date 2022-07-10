export type ListablePokemon = {
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
  stats: {
    base_stat: number;
    effort: number;
    stat: { name: string };
  }[];
  types: { type: { name: string } }[];
  weight: number;
};

export type PokemonSpecie = {
  base_happiness: number;
  capture_rate: number;
  color: { name: string; url: string };
  egg_groups: { name: string; url: string }[];
  evolution_chain: unknown;
  evolves_from_species: unknown;
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
    version: unknown;
  }[];
};

export type Pokemon = {
  id: number;
  name: string;
  types: string[];
  specie: string;
  image: string;
  descriptions: Record<string, string>;
  stats: { name: string; value: number }[];
  color: string;
};

type PokemonFromApi = { name: string; url: string };

export type ListPokemonsResult = { results: PokemonFromApi[] };

export type ListPokemonsByGenerationResult = {
  pokemon_species: PokemonFromApi[];
};

export enum Order {
  Id = 'id',
  Name = 'name',
}
