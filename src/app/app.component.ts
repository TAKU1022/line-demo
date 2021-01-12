import { Component } from '@angular/core';
import { User } from '@interfaces/user';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'line-demo';
  user$: Observable<User> = this.authService.user$;

  constructor(private authService: AuthService) {}
}
