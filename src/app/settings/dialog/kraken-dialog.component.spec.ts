import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KrakenDialogComponent } from './kraken-dialog.component';

describe('ExportsDialogComponent', () => {
  let component: KrakenDialogComponent;
  let fixture: ComponentFixture<KrakenDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [KrakenDialogComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KrakenDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
