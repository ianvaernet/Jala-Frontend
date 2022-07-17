import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PokemonTypes } from '../../types';

@Component({
  selector: 'app-add-pokemon-modal',
  templateUrl: './add-pokemon-modal.component.html',
  styleUrls: ['./add-pokemon-modal.component.scss'],
})
export class AddPokemonModalComponent {
  addPokemonForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    descriptionSpanish: new FormControl('', [Validators.required]),
    descriptionEnglish: new FormControl('', [Validators.required]),
    descriptionFrench: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    types: new FormControl('', [Validators.required]),
    hp: new FormControl(0, [Validators.required]),
    speed: new FormControl(0, [Validators.required]),
    attack: new FormControl(0, [Validators.required]),
    specialAttack: new FormControl(0, [Validators.required]),
    defense: new FormControl(0, [Validators.required]),
    specialDefense: new FormControl(0, [Validators.required]),
  });
  pokemonTypes = PokemonTypes;

  constructor(
    private dialogRef: MatDialogRef<AddPokemonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  addPokemon() {
    console.log(this.addPokemonForm.value);
    const controlsWithError = Object.values(
      this.addPokemonForm.controls
    ).filter((control: AbstractControl) => control.errors);
    if (!controlsWithError.length) {
      this.dialogRef.close(this.addPokemonForm.value);
    }
  }
}
