import { Component, OnInit } from '@angular/core';
import { Room } from '@interfaces/room';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';

@Component({
  selector: 'app-created-room-list',
  templateUrl: './created-room-list.component.html',
  styleUrls: ['./created-room-list.component.scss'],
})
export class CreatedRoomListComponent implements OnInit {
  private userId: string = this.authService.userId;

  rooms$: Observable<Room[]> = this.roomService.getCreatedRooms(this.userId);

  constructor(
    private authService: AuthService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {}
}
