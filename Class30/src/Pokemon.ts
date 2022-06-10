import axios, { AxiosResponse } from 'axios';
/*

Pokemon class
  - one pokemon has name, id, types and moves
  

List of goals:
  - create a function to get all information of a pokemon from result of getSinglePokemon
  - get a List of types from a pokemon, assing to a variable called types
  - get a List of moves from a pokemon, you can only choose 4 moves by pokemon, those moves should be aleatory
  - fill Moves with missing data from Types you can get the information from url of the move.
  - re-write decortator to get new pokemons Ids in PokemonTrainer class 
*/

const MIN_ID = 1;
const MAX_ID = 898;

type PokemonData = {
  abilities: { ability: { name: string; url: string } }[];
  id: number;
  name: string;
  moves: { move: { name: string; url: string } }[];
  types: { type: { name: string; url: string } }[];
};

function getSinglePokemon(id: string | number): Promise<AxiosResponse<PokemonData>> {
  return axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
}

function getRandomNumber(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(array: T[], elementsToPick: number): T[] {
  elementsToPick = Math.min(elementsToPick, array.length);
  const pickedElements: T[] = [];
  for (let i = 0; i < elementsToPick; i++) {
    const randomIndex = getRandomNumber(0, array.length - 1);
    pickedElements.push(array[randomIndex]);
  }
  return pickedElements;
}

async function getMoveData(move: { name: string; url: string }): Promise<Move> {
  const moveDetails = await axios.get(move.url).then((res) => res.data);
  return {
    name: move.name,
    url: move.url,
    type: moveDetails.type.name,
    damage: moveDetails.power,
    powerPoints: moveDetails.pp,
    accuracy: moveDetails.accuracy,
  };
}

type Move = {
  name: string;
  url: string;
  type?: string;
  damage?: number;
  powerPoints?: number;
  accuracy?: number;
};

type Type = {
  name: string;
  url: string;
};

export class Pokemon {
  name: string = '';
  id: number = 0;
  moves: Move[] = [];
  types: Type[] = [];

  constructor(pokemonResult: PokemonData) {
    this.buildFieldsPokemon(pokemonResult);
  }

  buildFieldsPokemon(pokemon: PokemonData) {
    this.id = pokemon.id;
    this.name = pokemon.name;
    this.types = pokemon.types.map(({ type }: PokemonData['types'][number]) => ({
      name: type.name,
      url: type.url,
    }));
    const moves = pickRandom<PokemonData['moves'][number]>(pokemon.moves, 4);
    Promise.all(moves.map(({ move }) => getMoveData(move))).then((moves) => (this.moves = moves));
  }

  displayInfo() {
    console.log(`==========================`);
    console.log(`${this.id} ${this.name}`);
    this.types.forEach((type) => {
      console.log(`${type.name}`);
    });
    this.moves.forEach((move) => {
      console.log(`${move.name}`);
    });
  }
}

function getNewPokemons<T extends { new (...args: any[]): {} }>(constructor: T) {
  return class extends constructor {
    listOfIds = [1, 2, 3].map(() => getRandomNumber(MIN_ID, MAX_ID));
  };
}

function randomIds(idsToGenerate: number) {
  const ids = [];
  const MIN_ID = 1;
  const MAX_ID = 898;
  for (let generatedIds = 0; generatedIds < idsToGenerate; generatedIds++) {
    ids.push(getRandomNumber(MIN_ID, MAX_ID));
  }
  return (target, prop) => {
    Object.defineProperty(target, prop, { value: ids });
  };
}

@getNewPokemons
export class PokemonTrainer {
  name: string;
  pokemons: Pokemon[] = [];
  @randomIds(3)
  listOfIds: number[];

  constructor(name: string) {
    this.name = name;
  }

  async getPokemons() {
    const listPokemons = this.listOfIds.map((id) => getSinglePokemon(id));
    const results = await Promise.all(listPokemons);
    results.forEach((result) => {
      this.pokemons.push(new Pokemon(result.data));
    });
  }

  async showTeam() {
    await this.getPokemons();
    console.log('Trainer:', this.name);
    this.pokemons.forEach((pokemon) => {
      pokemon.displayInfo();
    });
  }
}
