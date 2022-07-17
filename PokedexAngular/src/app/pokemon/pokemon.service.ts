import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, tap } from 'rxjs';
import {
  ListablePokemon,
  ListPokemonsByGenerationResult,
  ListPokemonsResult,
  Pokemon,
  PokemonDetails,
  PokemonEvolutionChain,
  PokemonSpecie,
  PokemonTypeColors,
} from './types';

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private API_URL = 'https://pokeapi.co/api/v2';
  constructor(private http: HttpClient) {}

  getPokemons(
    limit?: number,
    offset?: number,
    generation?: number
  ): Observable<ListablePokemon[]> {
    const pokemonsData = generation
      ? this.getPokemonsFromGeneration(generation)
      : this.getPokemonsData(limit, offset);
    const backgroundColors = this.getPokemonBackgroundColors();
    const pokemons = forkJoin([pokemonsData, backgroundColors])
      .pipe(
        map(([pokemons, pokemonColors]) => {
          return pokemons.map((pokemon) => {
            const id = this.getIdFromUrl(pokemon.url);
            return {
              ...pokemon,
              id: parseInt(id),
              image: this.getPokemonImageUri(id),
              color: pokemonColors[id],
            } as ListablePokemon;
          });
        })
      )
      .pipe(
        tap((pokemons) => {
          if (!generation) {
            pokemons.unshift(...this.getCustomPokemons());
          }
          return pokemons;
        })
      );
    return pokemons;
  }

  getPokemonsFromGeneration(generation: number) {
    const pokemons = this.http
      .get<ListPokemonsByGenerationResult>(
        `${this.API_URL}/generation/${generation}`
      )
      .pipe(map((response) => response.pokemon_species));

    return pokemons;
  }

  getPokemonsData(limit = 50, offset = 0) {
    const pokemons = this.http
      .get<ListPokemonsResult>(
        `${this.API_URL}/pokemon?limit=${limit}&offset=${offset}`
      )
      .pipe(map((response) => response.results));

    return pokemons;
  }

  getPokemonImageUri(id: string) {
    const imageId = ('00' + id).slice(-3);
    return `https://assets.pokemon.com/assets/cms2/img/pokedex/detail/${imageId}.png`;
  }

  getPokemonBackgroundColors() {
    const pokemonColors = this.http.get<Record<string, string>>(
      '/assets/pokemons-colors.json'
    );
    return pokemonColors;
  }

  getIdFromUrl(url: string) {
    return url.split('/').slice(-2, -1)[0];
  }

  getPokemon(id: string): Observable<Pokemon> {
    const pokemonDetails = this.getPokemonDetails(id);
    const pokemonSpecie = this.getPokemonSpecie(id);
    const pokemon = forkJoin([pokemonDetails, pokemonSpecie]).pipe(
      map(([pokemonDetails, pokemonSpecie]) => ({
        id: pokemonDetails.id,
        name: pokemonDetails.name,
        types: pokemonDetails.types.map((type) => ({
          name: type.type.name,
          color: PokemonTypeColors[type.type.name],
        })),
        specie: pokemonSpecie.egg_groups[0].name,
        image: this.getPokemonImageUri(id),
        descriptions: this.getPokemonDescriptions(pokemonSpecie),
        stats: pokemonDetails.stats.map((stat) => ({
          name: stat.stat.name,
          value: stat.base_stat,
        })),
        color: pokemonSpecie.color.name,
        evolutionChainId: this.getIdFromUrl(pokemonSpecie.evolution_chain.url),
      }))
    );
    return pokemon;
  }

  getPokemonDetails(id: string) {
    return this.http.get<PokemonDetails>(`${this.API_URL}/pokemon/${id}`);
  }
  getPokemonSpecie(id: string) {
    return this.http.get<PokemonSpecie>(
      `${this.API_URL}/pokemon-species/${id}`
    );
  }

  getPokemonDescriptions(pokemonSpecie: PokemonSpecie) {
    const languages = [
      ['es', 'Spanish'],
      ['en', 'English'],
      ['fr', 'French'],
    ];
    const descriptions: Record<string, string> = {};
    languages.forEach(([language, languageName]) => {
      const uniqueDescriptions = new Set(
        pokemonSpecie.flavor_text_entries
          .filter((entry) => entry.language.name === language)
          .map((entry) =>
            entry?.flavor_text.replace(/\n/g, ' ').replace(/\f/g, ' ')
          )
      );
      descriptions[languageName] = Array.from(uniqueDescriptions).join(' ');
    });
    return descriptions;
  }

  getPokemonEvolutionChain(
    evolutionChainId: string
  ): Observable<Pokemon['evolutionChain']> {
    return this.http
      .get<PokemonEvolutionChain>(
        `${this.API_URL}/evolution-chain/${evolutionChainId}`
      )
      .pipe(
        map((response) => {
          let evolution = response.chain;
          const evolutions = [];
          while (evolution) {
            const { species } = evolution;
            const id = this.getIdFromUrl(species.url);
            evolutions.push({
              id,
              name: species.name,
              image: this.getPokemonImageUri(id),
            });
            evolution = evolution.evolves_to[0];
          }
          return evolutions;
        })
      );
  }

  getCustomPokemons(id?: string): Pokemon[] {
    const pokemonsJSON = localStorage.getItem('pokemons');
    const pokemons: any[] = JSON.parse(pokemonsJSON || '[]');
    return pokemons.map((pokemon) => ({
      ...pokemon,
      types: pokemon.types.map((type: string) => ({
        name: type,
        color: PokemonTypeColors[type],
      })),
    }));
  }

  getCustomPokemon(id: string) {
    const pokemons = this.getCustomPokemons();
    return pokemons.find((pokemon) => pokemon.id === parseInt(id));
  }

  saveCustomPokemon(pokemon: any) {
    const pokemons = this.getCustomPokemons();
    pokemon.descriptions = {
      Spanish: pokemon.descriptionSpanish!,
      English: pokemon.descriptionEnglish!,
      French: pokemon.descriptionFrench!,
    };
    pokemon.stats = [
      { name: 'hp', value: pokemon.hp },
      { name: 'speed', value: pokemon.speed },
      { name: 'attack', value: pokemon.attack },
      { name: 'specialAttack', value: pokemon.specialAttack },
      { name: 'defense', value: pokemon.defense },
      { name: 'specialDefense', value: pokemon.specialDefense },
    ];
    delete pokemon.descriptionSpanish;
    delete pokemon.descriptionEnglish;
    delete pokemon.descriptionFrench;
    delete pokemon.hp;
    delete pokemon.speed;
    delete pokemon.attack;
    delete pokemon.specialAttack;
    delete pokemon.defense;
    delete pokemon.specialDefense;
    pokemons.push({ ...pokemon, id: 1000 + pokemons!.length });
    localStorage.setItem('pokemons', JSON.stringify(pokemons));
  }
}
