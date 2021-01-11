import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JoinedRoomListRoutingModule } from './joined-room-list-routing.module';
import { JoinedRoomListComponent } from './joined-room-list.component';

@NgModule({
  declarations: [JoinedRoomListComponent],
  imports: [CommonModule, JoinedRoomListRoutingModule],
})
export class JoinedRoomListModule {}
