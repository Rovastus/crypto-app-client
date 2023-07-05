import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PortfolioActions, PortfolioApiActions } from '../store/portfolio/portfolio.actions';
import { PortfolioI } from '../store/portfolio/portfolio.model';
import { PortfolioSelectors } from '../store/portfolio/portfolio.selectors';
import { PortfolioDialogComponent } from './dialog/portfolio-dialog.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PortfolioComponent implements OnInit {
  private readonly dialog = inject(MatDialog);
  private readonly store = inject(Store);

  portfolios$: Observable<PortfolioI[]> = this.store.select(PortfolioSelectors.selectPortfolios);

  ngOnInit(): void {
    this.store.dispatch(PortfolioApiActions.loadPortfolios());
  }

  openDialog(): void {
    this.dialog.open(PortfolioDialogComponent, { width: '400px' });
  }

  portfolioSelected(portfolio: PortfolioI): void {
    this.store.dispatch(PortfolioActions.setCurrentPortfolio({ portfolio }));
  }
}
