import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameChangerLoginLayoutComponent } from './gamechanger-admin-login-layout.component';

describe('GameChangerLoginLayoutComponent', () => {
  let component: GameChangerLoginLayoutComponent;
  let fixture: ComponentFixture<GameChangerLoginLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GameChangerLoginLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameChangerLoginLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
