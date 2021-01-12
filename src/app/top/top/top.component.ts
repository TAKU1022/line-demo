import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Room } from '@interfaces/room';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { RoomService } from 'src/app/services/room.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-top',
  templateUrl: './top.component.html',
  styleUrls: ['./top.component.scss'],
})
export class TopComponent implements OnInit {
  private userId: string = this.authService.userId;

  roomForm: FormGroup = this.fb.group({
    name: ['', Validators.required],
    description: ['', Validators.required],
    iconURL: ['', Validators.required],
  });
  rooms$: Observable<Room[]> = this.roomService.getAllRooms();

  constructor(
    private authService: AuthService,
    private roomService: RoomService,
    private fb: FormBuilder,
    private userService: UserService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}

  logout(): void {
    this.authService.logout();
  }

  submit(): void {
    const formData: {
      name: string;
      description: string;
      iconURL: string;
    } = this.roomForm.value;
    this.roomService
      .createRoom({
        ownerId: this.userId,
        name: formData.name,
        description: formData.description,
        iconURL: formData.iconURL,
      })
      .then(() => {
        this.snackBar.open('作成完了');
      });
  }

  joinRoom(roomId: string): void {
    Promise.all([
      this.roomService.addRoomJoinedUserId(roomId, this.userId),
      this.userService.addUserJoinedRoomId(this.userId, roomId),
    ]).then(() => {
      this.snackBar.open('参加しました');
    });
  }
}
