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
  pokemon!: Pokemon;
  faAnglesLeft = faAnglesLeft;
  descriptionLanguage: string = 'Spanish';
  descriptionLanguageOptions!: { name: string; value: string }[];

  constructor(private location: Location, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.data.subscribe((data) => {
      this.pokemon = data['pokemon'];
      console.log(this.pokemon);
      const availableDescriptionLanguages = Object.keys(
        this.pokemon.descriptions
      );
      this.descriptionLanguageOptions = availableDescriptionLanguages.map(
        (lang) => ({ name: lang, value: lang })
      );
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

  onDescriptionLanguageChange(language: string) {
    this.descriptionLanguage = language;
  }
}
