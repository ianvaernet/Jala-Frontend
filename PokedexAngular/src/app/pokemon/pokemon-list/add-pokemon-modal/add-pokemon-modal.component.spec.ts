import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPokemonModalComponent } from './add-pokemon-modal.component';

describe('AddPokemonModalComponent', () => {
  let component: AddPokemonModalComponent;
  let fixture: ComponentFixture<AddPokemonModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPokemonModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPokemonModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
