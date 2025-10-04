import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  styleUrls: ['./navbar.component.scss'],
  templateUrl: './navbar.component.html'
})
export class NavbarComponent {
  constructor(private auth: AuthService) {}
  isLoggedIn() { return this.auth.isLoggedIn(); }
  logout() { this.auth.logout(); }
}
