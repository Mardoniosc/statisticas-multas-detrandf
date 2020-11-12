import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardDetranRoutingModule } from './dashboard-detran-routing.module';
import { HomeComponent } from './home/home.component';


@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    DashboardDetranRoutingModule
  ]
})
export class DashboardDetranModule { }
