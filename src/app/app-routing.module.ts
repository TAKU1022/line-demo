import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./top/top.module').then((m) => m.TopModule),
  },
  {
    path: 'created-room-list',
    loadChildren: () =>
      import('./created-room-list/created-room-list.module').then(
        (m) => m.CreatedRoomListModule
      ),
  },
  {
    path: 'joined-room-list',
    loadChildren: () =>
      import('./joined-room-list/joined-room-list.module').then(
        (m) => m.JoinedRoomListModule
      ),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
