import { ChangeDetectionStrategy, Component, effect, inject, signal } from '@angular/core';
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
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioDialogComponent {
  private readonly dialogRef = inject(MatDialogRef<PortfolioDialogComponent>);
  private readonly formBuilder = inject(FormBuilder);
  private readonly store = inject(Store);

  fiatList = FIAT_LIST;
  taxMethodList = TAX_METHOD_LIST;

  private closeDialogWhenLoadingFinished = signal(false);
  creationPortfolioLoading = this.store.selectSignal(PortfolioSelectors.selectCreationPortfolioLoading);
  private closeDialogRefEffect = effect(() => {
    if (this.closeDialogWhenLoadingFinished() && !this.creationPortfolioLoading()) {
      this.dialogRef.close();
    }
  });

  loading$ = this.store.select(PortfolioSelectors.selectCreationPortfolioLoading).pipe(
    tap((loading) => {
      if (!loading && this.closeDialogWhenLoadingFinished()) {
        this.dialogRef.close();
      }
    }),
  );

  portfolioForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    taxMethod: [TAX_METHOD_LIST[0].value, Validators.required],
    fiat: [FIAT_LIST[0].value, Validators.required],
  });

  createPortfolio(): void {
    if (!this.portfolioForm.valid) {
      return;
    }

    const newPortfolio: CreatePortfolioI = this.portfolioForm.getRawValue();

    this.closeDialogWhenLoadingFinished.set(true);
    this.store.dispatch(PortfolioApiActions.createPortfolio({ portfolio: newPortfolio }));
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
