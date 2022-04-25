import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginFormSnackbarComponent } from './login-form-snackbar.component';

describe('LoginFormSnackbarComponent', () => {
  let component: LoginFormSnackbarComponent;
  let fixture: ComponentFixture<LoginFormSnackbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LoginFormSnackbarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginFormSnackbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
