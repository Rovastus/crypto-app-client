import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
	{ path: 'info', loadChildren: () => import('./info/info.module').then((m) => m.InfoModule) },
	{ path: 'files', loadChildren: () => import('./files/files.module').then((m) => m.FilesModule) },
	{ path: 'transactions', loadChildren: () => import('./transactions/transactions.module').then((m) => m.TransactionsModule) },
	{ path: 'earns', loadChildren: () => import('./earns/earns.module').then((m) => m.EarnsModule) },
	{ path: 'settings', loadChildren: () => import('./settings/settings.module').then((m) => m.SettingsModule) },
	{ path: '**', redirectTo: 'info', pathMatch: 'full' },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
