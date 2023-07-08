import { ChangeDetectionStrategy, Component, effect, inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
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

  private closeDialog = false;
  private closeDialogWhenPortfolioAddedEffect = effect(() => {
    const portfolios = this.store.selectSignal(PortfolioSelectors.selectPortfolios);
    if (portfolios() && this.closeDialog) {
      this.dialogRef.close();
    }
    this.closeDialog = true;
  });

  loading = this.store.selectSignal(PortfolioSelectors.selectCreationPortfolioLoading);

  fiatList = FIAT_LIST;
  taxMethodList = TAX_METHOD_LIST;
  portfolioForm = this.formBuilder.nonNullable.group({
    name: ['', Validators.required],
    taxMethod: [TAX_METHOD_LIST[0].value, Validators.required],
    fiat: [FIAT_LIST[0].value, Validators.required],
  });

  createPortfolio(): void {
    if (!this.portfolioForm.valid) {
      return;
    }

    const portfolio: CreatePortfolioI = this.portfolioForm.getRawValue();
    this.store.dispatch(PortfolioApiActions.createPortfolio({ portfolio }));
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
