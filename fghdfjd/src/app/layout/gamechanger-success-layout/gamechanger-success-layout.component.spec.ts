import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GamechangerSuccessLayoutComponent } from './gamechanger-success-layout.component';

describe('GamechangerSuccessLayoutComponent', () => {
  let component: GamechangerSuccessLayoutComponent;
  let fixture: ComponentFixture<GamechangerSuccessLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamechangerSuccessLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamechangerSuccessLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
