import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { routerReducer } from '@ngrx/router-store';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ApolloModule } from 'apollo-angular';
import { AppRoutingModule } from './app-router.module';
import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { PortfolioDialogComponent } from './portfolio/dialog/portfolio-dialog.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { CoinPairEffects } from './store/coin-pair/coin-pair.effects';
import { COIN_PAIR_STORE_KEY, coinPairsReducer } from './store/coin-pair/coin-pair.reducer';
import { CoinInfosEffects } from './store/coins/coin-info.effects';
import { COIN_INFO_STORE_KEY, coinsReducer } from './store/coins/coin-info.reducer';
import { FilesEffects } from './store/files/files.effects';
import { FILE_DATA_STORE_KEY, fileDataReducer } from './store/files/files.reducer';
import { PortfolioEffects } from './store/portfolio/portfolio.effects';
import { PORTFOLIO_DATA_STORE_KEY, portfolioDataReducer } from './store/portfolio/portfolio.reducer';

@NgModule({
  declarations: [AppComponent, PortfolioComponent, PortfolioDialogComponent],
  imports: [
    ApolloModule,
    BrowserModule,
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatSnackBarModule,
    MatIconModule,
    MatGridListModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatSnackBarModule,
    StoreModule.forRoot({
      [PORTFOLIO_DATA_STORE_KEY]: portfolioDataReducer,
      [COIN_INFO_STORE_KEY]: coinsReducer,
      [COIN_PAIR_STORE_KEY]: coinPairsReducer,
      [FILE_DATA_STORE_KEY]: fileDataReducer,
      router: routerReducer,
    }),
    StoreDevtoolsModule.instrument(),
    EffectsModule.forRoot(PortfolioEffects, CoinInfosEffects, CoinPairEffects, FilesEffects),
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
