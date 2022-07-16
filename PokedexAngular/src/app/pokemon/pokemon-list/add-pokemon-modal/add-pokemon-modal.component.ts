import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-pokemon-modal',
  templateUrl: './add-pokemon-modal.component.html',
  styleUrls: ['./add-pokemon-modal.component.scss'],
})
export class AddPokemonModalComponent {
  addPokemonForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.minLength(4)]),
    descriptionSpanish: new FormControl(''),
    descriptionEnglish: new FormControl(''),
    descriptionFrench: new FormControl(''),
    image: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    type: new FormControl('', [Validators.required]),
    hp: new FormControl(0, [Validators.required]),
    speed: new FormControl(0, [Validators.required]),
    attack: new FormControl(0, [Validators.required]),
    specialAttack: new FormControl(0, [Validators.required]),
    defense: new FormControl(0, [Validators.required]),
    specialDefense: new FormControl(0, [Validators.required]),
  });

  constructor(
    private dialogRef: MatDialogRef<AddPokemonModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  onSubmit() {
    console.log(this.addPokemonForm.value);
    this.dialogRef.close(this.addPokemonForm.value);
  }
}
