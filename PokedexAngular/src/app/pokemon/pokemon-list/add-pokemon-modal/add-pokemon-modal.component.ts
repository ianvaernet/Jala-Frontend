import { Component, Inject } from '@angular/core';
import {
  AbstractControl,
  UntypedFormControl,
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
    name: new UntypedFormControl('', [Validators.required, Validators.minLength(4)]),
    descriptionSpanish: new UntypedFormControl('', [Validators.required]),
    descriptionEnglish: new UntypedFormControl('', [Validators.required]),
    descriptionFrench: new UntypedFormControl('', [Validators.required]),
    image: new UntypedFormControl('', [Validators.required]),
    color: new UntypedFormControl('', [Validators.required]),
    types: new UntypedFormControl('', [Validators.required]),
    hp: new UntypedFormControl(0, [Validators.required]),
    speed: new UntypedFormControl(0, [Validators.required]),
    attack: new UntypedFormControl(0, [Validators.required]),
    specialAttack: new UntypedFormControl(0, [Validators.required]),
    defense: new UntypedFormControl(0, [Validators.required]),
    specialDefense: new UntypedFormControl(0, [Validators.required]),
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
