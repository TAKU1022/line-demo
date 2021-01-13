import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoomDetailRoutingModule } from './room-detail-routing.module';
import { RoomDetailComponent } from './room-detail/room-detail.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [RoomDetailComponent],
  imports: [CommonModule, RoomDetailRoutingModule, SharedModule],
})
export class RoomDetailModule {}
