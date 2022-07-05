import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PokemonService } from '../pokemon.service';
import { Pokemon } from '../types';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  id: string = '1';
  pokemon!: Pokemon;

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private pokemonService: PokemonService
  ) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id') || '1';
    this.pokemonService.getPokemon(this.id).subscribe((pokemon) => {
      this.pokemon = pokemon;
    });
  }

  getPokemonNameColor() {
    if (this.pokemon.color === 'white' || this.pokemon.color === 'yellow') {
      return 'black';
    } else {
      return 'white';
    }
  }

  goBack(): void {
    this.location.back();
  }
}
