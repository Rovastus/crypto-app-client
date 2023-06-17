import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { PortpholioComponent } from './portpholio/portpholio.component';
import { PortpholioDialogComponent } from './portpholio/dialog/portpholio-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { StoreModule } from '@ngrx/store';
import { coinsReducer } from './store/coins/coin-info.reducer';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ApolloModule } from 'apollo-angular';
import { AppRoutingModule } from './app-router.module';
import { MatDialogModule } from '@angular/material/dialog';
import { portpholioDataReducer } from './store/portpholio/portpholio.reducer';
import { EffectsModule } from '@ngrx/effects';
import { PortpholioEffects } from './store/portpholio/portpholio.effects';
import { CoinInfosEffects } from './store/coins/coin-info.effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
	declarations: [AppComponent, PortpholioComponent, PortpholioDialogComponent],
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
			portpholioData: portpholioDataReducer,
			coins: coinsReducer,
		}),
		StoreDevtoolsModule.instrument(),
		EffectsModule.forRoot(PortpholioEffects, CoinInfosEffects),
		AppRoutingModule,
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
