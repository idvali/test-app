import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailViewComponent } from './detail-view/detail-view.component';
import { GridViewComponent } from './grid-view/grid-view.component';

const routes: Routes = [
  {
    path: '',
    component: GridViewComponent
  },
  {
    path: 'box/:id',
    component: DetailViewComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
