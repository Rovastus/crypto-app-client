import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SnackBarService } from 'src/app/service/snack-bar/snack-bar.service';
import { CreatePortfolioGQL, FiatEnum, TaxMethodEnum } from 'src/generated/graphql';

@Component({
  selector: 'app-portfolio-dialog',
  templateUrl: './portfolio-dialog.component.html',
  styleUrls: ['./portfolio-dialog.component.css'],
})
export class PortfolioDialogComponent {
  fiatList: { key: string; value: FiatEnum }[];
  taxMethodList: { key: string; value: TaxMethodEnum }[];
  loading = false;
  portfolioForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<PortfolioDialogComponent>,
    private formBuilder: FormBuilder,
    private snackBarService: SnackBarService,
    private createPortfolioGQL: CreatePortfolioGQL,
  ) {
    this.fiatList = Object.entries(FiatEnum).map(([key, value]) => ({
      key,
      value,
    }));
    this.taxMethodList = Object.entries(TaxMethodEnum).map(([key, value]) => ({
      key,
      value,
    }));
    this.portfolioForm = this.formBuilder.group({
      nameField: [null, Validators.required],
      taxMethodField: [null, Validators.required],
      fiatField: [null, Validators.required],
    });
  }

  createPortfolio(): void {
    if (this.portfolioForm.valid) {
      this.loading = true;
      this.createPortfolioGQL
        .mutate({
          name: this.portfolioForm.value.nameField,
          taxMethod: this.portfolioForm.value.taxMethodField,
          fiat: this.portfolioForm.value.fiatField,
        })
        .subscribe((res) => {
          this.loading = true;
          this.snackBarService.displayInfo('Portfolio created.');

          this.dialogRef.close(true);
        });
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
