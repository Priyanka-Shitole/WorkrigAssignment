import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataProgressComponent } from './data-progress/data-progress.component';


const routes: Routes = [
	{ path: '', component: DataProgressComponent }

];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DataProgressRoutingModule { }
