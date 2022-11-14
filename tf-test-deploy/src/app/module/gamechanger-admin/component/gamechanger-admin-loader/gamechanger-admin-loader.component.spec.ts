import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamechangerAdminLoaderComponent } from './gamechanger-admin-loader.component';

describe('GamechangerAdminLoaderComponent', () => {
  let component: GamechangerAdminLoaderComponent;
  let fixture: ComponentFixture<GamechangerAdminLoaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamechangerAdminLoaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamechangerAdminLoaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
