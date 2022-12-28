import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamechangerAdminTablesLayoutComponent } from './gamechanger-admin-tables-layout.component';

describe('GamechangerAdminTablesLayoutComponent', () => {
  let component: GamechangerAdminTablesLayoutComponent;
  let fixture: ComponentFixture<GamechangerAdminTablesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamechangerAdminTablesLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamechangerAdminTablesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
