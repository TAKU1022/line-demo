import { Component, OnInit } from '@angular/core';
import { Room } from '@interfaces/room';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { RoomService } from '../services/room.service';

@Component({
  selector: 'app-joined-room-list',
  templateUrl: './joined-room-list.component.html',
  styleUrls: ['./joined-room-list.component.scss'],
})
export class JoinedRoomListComponent implements OnInit {
  private userId: string = this.authService.userId;

  rooms$: Observable<Room[]> = this.roomService.getJoinedRooms(this.userId);

  constructor(
    private authService: AuthService,
    private roomService: RoomService
  ) {}

  ngOnInit(): void {}
}
