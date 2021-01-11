import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreatedRoomListRoutingModule } from './created-room-list-routing.module';
import { CreatedRoomListComponent } from './created-room-list/created-room-list.component';

@NgModule({
  declarations: [CreatedRoomListComponent],
  imports: [CommonModule, CreatedRoomListRoutingModule],
})
export class CreatedRoomListModule {}
