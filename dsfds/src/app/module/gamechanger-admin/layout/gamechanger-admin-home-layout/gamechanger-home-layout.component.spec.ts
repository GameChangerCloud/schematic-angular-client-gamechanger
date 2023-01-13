import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamechangerAdminHomeLayoutComponent } from './gamechanger-home-layout.component';

describe('GamechangerHomeLayoutComponent', () => {
  let component: GamechangerAdminHomeLayoutComponent;
  let fixture: ComponentFixture<GamechangerAdminHomeLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamechangerAdminHomeLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamechangerAdminHomeLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
