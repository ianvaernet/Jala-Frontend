import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { PokemonService } from '../pokemon.service';
import { ListablePokemon, Order } from '../types';
import { AddPokemonModalComponent } from './add-pokemon-modal/add-pokemon-modal.component';

@Component({
  selector: 'app-pokemon-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss'],
})
export class PokemonListComponent implements OnInit {
  pokemons: ListablePokemon[] = [];
  pokemonsToDisplay: ListablePokemon[] = [];
  search = '';
  generation = '0';
  order: string = Order.Id;
  limit = 50;
  offset = 0;
  orderOptions = Object.values(Order).map((order) => ({
    name: order,
    value: order,
  }));
  generationOptions = [
    { name: 'All', value: '0' },
    { name: 'Generation 1', value: '1' },
    { name: 'Generation 2', value: '2' },
    { name: 'Generation 3', value: '3' },
    { name: 'Generation 4', value: '4' },
    { name: 'Generation 5', value: '5' },
  ];
  addIcon = faPlus;

  constructor(
    private pokemonService: PokemonService,
    private route: ActivatedRoute,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.pokemons = this.route.snapshot.data['pokemons'];
    this.pokemonsToDisplay = this.pokemons;
    this.offset += this.limit;
  }

  getMorePokemons() {
    this.pokemonService
      .getPokemons(this.limit, this.offset, parseInt(this.generation))
      .subscribe((pokemons) => {
        if (this.order === Order.Name) {
          this.pokemons = this.orderPokemonsByName([
            ...this.pokemons,
            ...pokemons,
          ]);
        } else {
          this.pokemons = [...this.pokemons, ...pokemons];
        }
        this.pokemonsToDisplay = this.pokemons;
      });
    this.offset += this.limit;
  }

  onSearchChange(search: string) {
    this.search = search;
    this.pokemonsToDisplay = search
      ? this.pokemons.filter((pokemon) => pokemon.name.includes(search))
      : this.pokemons;
  }

  onGenerationChange(generation: string) {
    this.generation = generation;
    this.pokemons = [];
    this.offset = 0;
    this.getMorePokemons();
  }

  orderPokemonsByName(pokemons: ListablePokemon[]) {
    return pokemons.sort((a, b) => a.name.localeCompare(b.name));
  }

  onScrollDown() {
    if (!this.search && !parseInt(this.generation)) {
      this.getMorePokemons();
    }
  }

  onOrderChange(order: string) {
    this.order = order;
    this.pokemons = [];
    this.offset = 0;
    this.getMorePokemons();
  }

  onAddPokemon() {
    this.dialog
      .open(AddPokemonModalComponent)
      .afterClosed()
      .subscribe((pokemon) => {
        this.pokemonService.saveCustomPokemon(pokemon);
      });
  }
}
