import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportsDialogComponent } from './exports-dialog.component';

describe('ExportsDialogComponent', () => {
  let component: ExportsDialogComponent;
  let fixture: ComponentFixture<ExportsDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportsDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
