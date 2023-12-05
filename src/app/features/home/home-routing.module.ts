import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    data: {title: 'Dashboard'}
  },
  // {
  //   path: 'about',
  //   component: AboutComponent,
  //   data: {title: 'About'}
  // },
  // {
  //   path: '**',
  //   pathMatch: 'full',
  //   component: LostComponent
  // }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
