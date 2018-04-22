import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DrinkDmComponent } from './drink-dm/drink-dm.component';
import { DrinkListComponent } from './drink-list/drink-list.component';
import { DrinkHomeComponent } from './drink-home/drink-home.component';

const routes: Routes = [
  { path: '', redirectTo: '/drink/home', pathMatch: 'full' },
  { path: 'drink/home', component: DrinkHomeComponent },
  { path: 'drink/:id', component: DrinkDmComponent },
  { path: 'drink/drinklist/:id', component: DrinkListComponent },
];

@NgModule({
  exports: [RouterModule],
  imports: [RouterModule.forRoot(routes)],
})

export class AppRoutingModule { }
