import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GamechangerAdminEntityDialogComponent } from './gamechanger-admin-entity-dialog.component';

describe('GamechangerAdminEntityDialogComponent', () => {
  let component: GamechangerAdminEntityDialogComponent;
  let fixture: ComponentFixture<GamechangerAdminEntityDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamechangerAdminEntityDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamechangerAdminEntityDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
