import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StoreRouterConnectingModule } from '@ngrx/router-store';

export const INFO_ROUTER_PATH = 'info';
export const FILES_ROUTER_PATH = 'files';
export const TRANSACTIONS_ROUTER_PATH = 'transactions';
export const EARNS_ROUTER_PATH = 'earns';
export const SETTINGS_ROUTER_PATH = 'settings';

const routes: Routes = [
  { path: INFO_ROUTER_PATH, loadChildren: () => import('./info/info.module').then((m) => m.InfoModule) },
  { path: FILES_ROUTER_PATH, loadChildren: () => import('./files/files.module').then((m) => m.FilesModule) },
  { path: TRANSACTIONS_ROUTER_PATH, loadChildren: () => import('./transactions/transactions.module').then((m) => m.TransactionsModule) },
  { path: EARNS_ROUTER_PATH, loadChildren: () => import('./earns/earns.module').then((m) => m.EarnsModule) },
  { path: SETTINGS_ROUTER_PATH, loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule) },
  { path: '**', redirectTo: 'info', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), StoreRouterConnectingModule.forRoot()],
  exports: [RouterModule],
})
export class AppRoutingModule {}
