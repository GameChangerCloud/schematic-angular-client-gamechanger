import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamechangerAdminMainLayoutComponent } from './gamechanger-admin-main-layout.component';

describe('GamechangerAdminMainLayoutComponent', () => {
  let component: GamechangerAdminMainLayoutComponent;
  let fixture: ComponentFixture<GamechangerAdminMainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamechangerAdminMainLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamechangerAdminMainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
