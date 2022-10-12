import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamechangerAdminLoginComponent } from './gamechanger-admin-login.component';

describe('GamechangerAdminLoginComponent', () => {
  let component: GamechangerAdminLoginComponent;
  let fixture: ComponentFixture<GamechangerAdminLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamechangerAdminLoginComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamechangerAdminLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
