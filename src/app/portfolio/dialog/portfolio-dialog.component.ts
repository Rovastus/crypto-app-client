import { Component, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs/operators';
import { FIAT_LIST, TAX_METHOD_LIST } from 'src/app/helpers/enum.helpers';
import { PortfolioApiActions } from 'src/app/store/portfolio/portfolio.actions';
import { CreatePortfolioI } from 'src/app/store/portfolio/portfolio.model';
import { PortfolioSelectors } from 'src/app/store/portfolio/portfolio.selectors';

@Component({
  selector: 'app-portfolio-dialog',
  templateUrl: './portfolio-dialog.component.html',
  styleUrls: ['./portfolio-dialog.component.scss'],
})
export class PortfolioDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<PortfolioDialogComponent>);
  private readonly formBuilder = inject(FormBuilder);
  private readonly store = inject(Store);

  private closeDialogWhenLoadingFinished = false;

  fiatList = FIAT_LIST;
  taxMethodList = TAX_METHOD_LIST;
  loading$ = this.store.select(PortfolioSelectors.selectCreationPortfolioLoading).pipe(
    tap((loading) => {
      if (!loading && this.closeDialogWhenLoadingFinished) {
        this.dialogRef.close();
      }
    }),
  );

  portfolioForm = this.formBuilder.group({
    nameField: ['', Validators.required],
    taxMethodField: [TAX_METHOD_LIST[0].value, Validators.required],
    fiatField: [FIAT_LIST[0].value, Validators.required],
  });

  createPortfolio(): void {
    if (this.portfolioForm.valid) {
      const name = this.portfolioForm.value.nameField;
      const taxMethod = this.portfolioForm.value.taxMethodField;
      const fiat = this.portfolioForm.value.fiatField;

      if (!name || !taxMethod || !fiat) {
        return;
      }

      const newPortfolio: CreatePortfolioI = { name, taxMethod, fiat };
      this.closeDialogWhenLoadingFinished = true;
      this.store.dispatch(PortfolioApiActions.createPortfolio({ portfolio: newPortfolio }));
    }
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
