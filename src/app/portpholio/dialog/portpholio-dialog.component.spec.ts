import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PortpholioDialogComponent } from './portpholio-dialog.component';

describe('PortpholioDialogComponent', () => {
  let component: PortpholioDialogComponent;
  let fixture: ComponentFixture<PortpholioDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PortpholioDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PortpholioDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
