import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JoinedRoomListRoutingModule } from './joined-room-list-routing.module';
import { JoinedRoomListComponent } from './joined-room-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [JoinedRoomListComponent],
  imports: [CommonModule, JoinedRoomListRoutingModule, SharedModule],
})
export class JoinedRoomListModule {}
