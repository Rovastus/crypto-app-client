import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EarnsComponent } from './earns.component';

const routes: Routes = [{ path: '', component: EarnsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EarnsRoutingModule { }
