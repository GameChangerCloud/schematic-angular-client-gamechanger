import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FactonicsSpinnerComponent } from './factonics-spinner.component';

describe('FactonicsSpinnerComponent', () => {
  let component: FactonicsSpinnerComponent;
  let fixture: ComponentFixture<FactonicsSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FactonicsSpinnerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FactonicsSpinnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
