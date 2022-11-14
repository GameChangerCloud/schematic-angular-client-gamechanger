import { ComponentFixture, TestBed } from '@angular/core/testing';
import { GamechangerPagenotfoundLayoutComponent } from './gamechanger-pagenotfound-layout.component';

describe('GamechangerPagenotfoundLayoutComponent', () => {
  let component: GamechangerPagenotfoundLayoutComponent;
  let fixture: ComponentFixture<GamechangerPagenotfoundLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GamechangerPagenotfoundLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GamechangerPagenotfoundLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
