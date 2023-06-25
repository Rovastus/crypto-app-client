import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/service/snack-bar/snack-bar.service';
import { CreatePortpholioGQL, FiatEnum, TaxMethodEnum } from 'src/generated/graphql';

@Component({
  selector: 'app-portpholio-dialog',
  templateUrl: './portpholio-dialog.component.html',
  styleUrls: ['./portpholio-dialog.component.css'],
})
export class PortpholioDialogComponent implements OnInit {
  fiatList: { key: string; value: FiatEnum }[];
  taxMethodList: { key: string; value: TaxMethodEnum }[];
  loading = false;
  portpholioForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PortpholioDialogComponent>,
    private formBuilder: FormBuilder,
    private snackBarService: SnackBarService,
    private createPortpholioGQL: CreatePortpholioGQL,
  ) {
    this.fiatList = Object.entries(FiatEnum).map(([key, value]) => ({
      key,
      value,
    }));
    this.taxMethodList = Object.entries(TaxMethodEnum).map(([key, value]) => ({
      key,
      value,
    }));
    this.portpholioForm = this.formBuilder.group({
      nameField: [null, Validators.required],
      taxMethodField: [null, Validators.required],
      fiatField: [null, Validators.required],
    });
  }

  ngOnInit(): void { }

  createPortpholio(): void {
    if (this.portpholioForm.valid) {
      this.loading = true;
      this.createPortpholioGQL
        .mutate({
          name: this.portpholioForm.value.nameField,
          taxMethod: this.portpholioForm.value.taxMethodField,
          fiat: this.portpholioForm.value.fiatField,
        })
        .subscribe((res) => {
          this.loading = true;
          this.snackBarService.displayInfo('Portpholio created.');

          this.dialogRef.close(true);
        });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
