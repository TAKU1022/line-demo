import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RoomDetailComponent } from './room-detail/room-detail.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: RoomDetailComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RoomDetailRoutingModule {}
