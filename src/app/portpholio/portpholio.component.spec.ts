import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortpholioComponent } from './portpholio.component';

describe('PortpholioComponent', () => {
  let component: PortpholioComponent;
  let fixture: ComponentFixture<PortpholioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortpholioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortpholioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
