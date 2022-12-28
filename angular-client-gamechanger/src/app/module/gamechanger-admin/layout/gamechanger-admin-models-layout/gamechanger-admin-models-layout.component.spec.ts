import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamechangerAdminModelsLayoutComponent } from './gamechanger-admin-models-layout.component';

describe('GamechangerAdminModelsLayoutComponent', () => {
  let component: GamechangerAdminModelsLayoutComponent;
  let fixture: ComponentFixture<GamechangerAdminModelsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamechangerAdminModelsLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamechangerAdminModelsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
