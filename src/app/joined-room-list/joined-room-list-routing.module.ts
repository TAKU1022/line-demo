import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JoinedRoomListComponent } from './joined-room-list.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: JoinedRoomListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JoinedRoomListRoutingModule {}
