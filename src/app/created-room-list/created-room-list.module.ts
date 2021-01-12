import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatedRoomListRoutingModule } from './created-room-list-routing.module';
import { CreatedRoomListComponent } from './created-room-list/created-room-list.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [CreatedRoomListComponent],
  imports: [CommonModule, CreatedRoomListRoutingModule, SharedModule],
})
export class CreatedRoomListModule {}
