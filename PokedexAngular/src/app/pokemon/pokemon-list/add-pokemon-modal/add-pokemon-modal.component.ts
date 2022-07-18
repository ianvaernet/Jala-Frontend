import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  UntypedFormGroup,
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
  addPokemonForm = new UntypedFormGroup({
    name: new FormControl<string>('', [Validators.required]),
    descriptionSpanish: new FormControl<string>('', [Validators.required]),
    descriptionEnglish: new FormControl<string>('', [Validators.required]),
    descriptionFrench: new FormControl<string>('', [Validators.required]),
    image: new FormControl<string>('', [Validators.required]),
    color: new FormControl<string>('', [Validators.required]),
    types: new FormControl<string>('', [Validators.required]),
    hp: new FormControl<number>(0, [Validators.required]),
    speed: new FormControl<number>(0, [Validators.required]),
    attack: new FormControl<number>(0, [Validators.required]),
    specialAttack: new FormControl<number>(0, [Validators.required]),
    defense: new FormControl<number>(0, [Validators.required]),
    specialDefense: new FormControl<number>(0, [Validators.required]),
  });
  pokemonTypes = PokemonTypes;

  constructor(
    private dialogRef: MatDialogRef<AddPokemonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  addPokemon() {
    const controlsWithError = Object.values(
      this.addPokemonForm.controls
    ).filter((control: AbstractControl) => control.errors);
    if (!controlsWithError.length) {
      this.dialogRef.close(this.addPokemonForm.value);
    }
  }

  getErrorMessage() {
    return 'This is a required field';
  }
}
