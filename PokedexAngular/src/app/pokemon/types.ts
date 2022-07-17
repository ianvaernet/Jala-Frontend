export type ListablePokemon = {
  id: number;
  name: string;
  url?: string;
  image: string;
  color: string;
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
  evolution_chain: { url: string };
  evolves_from_species: unknown;
  flavor_text_entries: {
    flavor_text: string;
    language: { name: string };
    version: unknown;
  }[];
};

type PokemonEvolution = {
  evolution_details: { trigger: { name: string } }[];
  evolves_to: PokemonEvolution[];
  species: { name: string; url: string };
};
export type PokemonEvolutionChain = {
  chain: PokemonEvolution;
};

export type Pokemon = {
  id: number;
  name: string;
  types: { name: string; color: string }[];
  specie: string;
  image: string;
  descriptions: Record<string, string>;
  stats: { name: string; value: number }[];
  color: string;
  evolutionChainId: string;
  evolutionChain?: { id: string; name: string; image: string }[];
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

export const PokemonTypes = [
  'normal',
  'fire',
  'water',
  'electric',
  'grass',
  'ice',
  'fighting',
  'poison',
  'ground',
  'flying',
  'psychic',
  'bug',
  'rock',
  'ghost',
  'dragon',
  'dark',
  'steel',
  'fairy',
];

export const PokemonTypeColors: Record<string, string> = {
  normal: '#A8A77A',
  fire: '#EE8130',
  water: '#6390F0',
  electric: '#F7D02C',
  grass: '#7AC74C',
  ice: '#96D9D6',
  fighting: '#C22E28',
  poison: '#A33EA1',
  ground: '#E2BF65',
  flying: '#A98FF3',
  psychic: '#F95587',
  bug: '#A6B91A',
  rock: '#B6A136',
  ghost: '#735797',
  dragon: '#6F35FC',
  dark: '#705746',
  steel: '#B7B7CE',
  fairy: '#D685AD',
};
