import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Pokemon } from '../../types';

@Component({
  selector: 'app-pokemon-evolution-chain',
  templateUrl: './pokemon-evolution-chain.component.html',
  styleUrls: ['./pokemon-evolution-chain.component.scss'],
})
export class PokemonEvolutionChainComponent implements OnInit {
  @Input() evolutionChain: Pokemon['evolutionChain'];
  @Input() color!: string;
  @Input() background!: string;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  goToPokemon(id: string) {
    this.router.navigate([`/pokedex/${id}`]);
  }
}
