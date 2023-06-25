import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { PortfolioActions, PortfolioApiActions } from '../store/portfolio/portfolio.actions';
import { PortfolioNameI } from '../store/portfolio/portfolio.model';
import { PortfolioSelectors } from '../store/portfolio/portfolio.selectors';
import { PortfolioDialogComponent } from './dialog/portfolio-dialog.component';

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  styleUrls: ['./portfolio.component.css'],
})
export class PortfolioComponent implements OnInit {
  portfolios$!: Observable<PortfolioNameI[]>;

  constructor(private dialog: MatDialog, private readonly store: Store) { }

  ngOnInit(): void {
    this.portfolios$ = this.store.select(PortfolioSelectors.selectPortfoliosNames);
    this.store.dispatch(PortfolioApiActions.loadPortfoliosNames());
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(PortfolioDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe((shouldUpdate: boolean) => {
      if (shouldUpdate) {
        this.store.dispatch(PortfolioApiActions.loadPortfoliosNames());
      }
    });
  }

  portfolioSelected(portfolioName: PortfolioNameI): void {
    this.store.dispatch(PortfolioActions.setCurrentPortfolioName({ portfolioName }));
  }
}
