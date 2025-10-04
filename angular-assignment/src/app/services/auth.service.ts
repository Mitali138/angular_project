import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private base = 'https://dummyjson.com';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { username: string; password: string }) {
  return this.http.post<any>(`${this.base}/auth/login`, credentials)
    .pipe(
      tap(res => {
        if (res && res.accessToken) {
          localStorage.setItem('jwt_token', res.accessToken);
        }
      })
    );
}


  logout() {
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('jwt_token');
  }

 getProfile() {
  return this.http.get<any>(`${this.base}/auth/me`);
}

}
