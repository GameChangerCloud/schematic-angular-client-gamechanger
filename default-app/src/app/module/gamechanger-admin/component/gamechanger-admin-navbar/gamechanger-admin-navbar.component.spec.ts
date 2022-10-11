import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamechangerAdminNavbarComponent } from './gamechanger-admin-navbar.component';

describe('GamechangerAdminNavbarComponent', () => {
  let component: GamechangerAdminNavbarComponent;
  let fixture: ComponentFixture<GamechangerAdminNavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamechangerAdminNavbarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamechangerAdminNavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
