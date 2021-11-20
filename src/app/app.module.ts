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
import { MatDialogModule } from '@angular/material/dialog';
import { PortpholioComponent } from './portpholio/portpholio.component';
import { PortpholioDialogComponent } from './portpholio/dialog/portpholio-dialog.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatListModule } from '@angular/material/list';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatGridListModule } from '@angular/material/grid-list';
import { StoreModule } from '@ngrx/store';
import { portpholioReducer } from './store/portpholio/portpholior.reducer';
import { InfoComponent } from './info/info.component';
import { ExportsComponent } from './exports/exports.component';
import { ExportsDialogComponent } from './exports/dialog/exports-dialog.component';
import { FileInputComponent } from './common/file-input/file-input.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { DepositsComponent } from './deposits/deposits/deposits.component';
import { MatTableModule } from '@angular/material/table';
import { EarnsComponent } from './earns/earns.component';
import { TransactionsComponent } from './transactions/transactions.component';
import { WithdrawsComponent } from './withdraws/withdraws.component';

@NgModule({
  declarations: [
    AppComponent,
    PortpholioComponent,
    PortpholioDialogComponent,
    InfoComponent,
    ExportsComponent,
    ExportsDialogComponent,
    FileInputComponent,
    DepositsComponent,
    EarnsComponent,
    TransactionsComponent,
    WithdrawsComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GraphQLModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatTabsModule,
    MatSnackBarModule,
    MatIconModule,
    MatGridListModule,
    MatListModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatTableModule,
    StoreModule.forRoot({ portpholioId: portpholioReducer }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
