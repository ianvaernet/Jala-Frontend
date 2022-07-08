import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Pokemon } from '../types';
import { faAnglesLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-pokemon-details',
  templateUrl: './pokemon-details.component.html',
  styleUrls: ['./pokemon-details.component.scss'],
})
export class PokemonDetailsComponent implements OnInit {
  id: string = '1';
  pokemon!: Pokemon;
  faAnglesLeft = faAnglesLeft;

  constructor(private location: Location, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')!;
    this.pokemon = this.route.snapshot.data['pokemon'];
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
