import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { GuestGuard } from './guards/guest.guard';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    loadChildren: () => import('./top/top.module').then((m) => m.TopModule),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'welcome',
    loadChildren: () =>
      import('./welcome/welcome.module').then((m) => m.WelcomeModule),
    canLoad: [GuestGuard],
    canActivate: [GuestGuard],
  },
  {
    path: 'created-room-list',
    loadChildren: () =>
      import('./created-room-list/created-room-list.module').then(
        (m) => m.CreatedRoomListModule
      ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'joined-room-list',
    loadChildren: () =>
      import('./joined-room-list/joined-room-list.module').then(
        (m) => m.JoinedRoomListModule
      ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
  {
    path: 'room-detail/:roomId',
    loadChildren: () =>
      import('./room-detail/room-detail.module').then(
        (m) => m.RoomDetailModule
      ),
    canLoad: [AuthGuard],
    canActivate: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
