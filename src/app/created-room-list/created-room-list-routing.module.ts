import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreatedRoomListComponent } from './created-room-list/created-room-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: CreatedRoomListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreatedRoomListRoutingModule {}
