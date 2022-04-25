import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwdForgetFormComponent } from './pwd-forget-form.component';

describe('PwdForgetFormComponent', () => {
  let component: PwdForgetFormComponent;
  let fixture: ComponentFixture<PwdForgetFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PwdForgetFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PwdForgetFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
