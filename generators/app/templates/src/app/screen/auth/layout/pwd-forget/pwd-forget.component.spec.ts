import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PwdForgetComponent } from './pwd-forget.component';

describe('PwdForgetComponent', () => {
  let component: PwdForgetComponent;
  let fixture: ComponentFixture<PwdForgetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PwdForgetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PwdForgetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
