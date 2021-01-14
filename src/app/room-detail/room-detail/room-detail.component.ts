import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { EntryLog } from '@interfaces/entryLog';
import { Room } from '@interfaces/room';
import { User } from '@interfaces/user';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { LineService } from 'src/app/services/line.service';
import { RoomService } from 'src/app/services/room.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-room-detail',
  templateUrl: './room-detail.component.html',
  styleUrls: ['./room-detail.component.scss'],
})
export class RoomDetailComponent implements OnInit {
  private userId: string = this.authService.userId;

  room$: Observable<Room>;
  entryLogs$: Observable<EntryLog[]>;
  user: User;
  displayedColumns: string[] = ['message', 'date'];

  constructor(
    private route: ActivatedRoute,
    private roomService: RoomService,
    private lineService: LineService,
    private authService: AuthService,
    private router: Router,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getRoomById();
    this.getEntryLogs();
    this.getUser();
  }

  private getRoomId(): Promise<string> {
    return this.route.paramMap
      .pipe(
        take(1),
        map((param: ParamMap) => param.get('roomId'))
      )
      .toPromise();
  }

  private getRoomById(): void {
    this.getRoomId().then(
      (roomId: string) => (this.room$ = this.roomService.getRoomById(roomId))
    );
  }

  private getEntryLogs(): void {
    this.getRoomId().then(
      (roomId: string) =>
        (this.entryLogs$ = this.lineService.getRoomEntryLogs(roomId))
    );
  }

  private getUser(): void {
    this.authService.user$
      .pipe(take(1))
      .toPromise()
      .then((user: User) => (this.user = user));
  }

  private updateUserActiveRoomId(roomId: string) {
    this.authService.user$
      .pipe(take(1))
      .toPromise()
      .then((user: User) => {
        if (!user.activeRoomId) {
          this.userService.updateUserActiveRoomId(this.userId, roomId);
        }
      });
  }

  addEntryLog(roomId: string, message: string): void {
    this.lineService.addEntryLog(roomId, message, this.userId).then(() => {
      this.updateUserActiveRoomId(roomId);
      this.snackBar.open(message, null);
    });
  }

  changeRoom(roomId: string): void {
    this.router.navigateByUrl('/joined-room-list').then(() => {
      this.userService.updateUserActiveRoomId(this.userId, roomId);
    });
  }
}
