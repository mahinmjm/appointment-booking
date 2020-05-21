import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentComponent } from './pages/appointment/appointment.component';
import { ListsComponent } from './pages/lists/lists.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [

  {
    path: '', component: HomeComponent
  },

  {
    path: 'appointment', component: AppointmentComponent
  },

  {
    path: 'lists', component: ListsComponent
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
exports: [RouterModule]
})
export class AppRoutingModule { }
