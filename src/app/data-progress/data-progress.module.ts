import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import { DataProgressRoutingModule } from './data-progress-routing.module';
import { DataProgressComponent } from './data-progress/data-progress.component';
import { NgCircleProgressModule } from 'ng-circle-progress';


@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    DataProgressRoutingModule,
    NgCircleProgressModule,
    MatRadioModule
  ]
})
export class DataProgressModule { }
