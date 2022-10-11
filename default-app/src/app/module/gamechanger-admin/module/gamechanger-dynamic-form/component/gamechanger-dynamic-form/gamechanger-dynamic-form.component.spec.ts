import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamechangerDynamicFormComponent } from './gamechanger-dynamic-form.component';

describe('GamechangerDynamicFormComponent', () => {
  let component: GamechangerDynamicFormComponent;
  let fixture: ComponentFixture<GamechangerDynamicFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamechangerDynamicFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamechangerDynamicFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
