import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnsComponent } from './earns.component';

describe('EarnsComponent', () => {
  let component: EarnsComponent;
  let fixture: ComponentFixture<EarnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EarnsComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EarnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
