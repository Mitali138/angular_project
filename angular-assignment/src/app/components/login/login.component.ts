import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMsg = '';

  loginForm = this.fb.group({
    username: ['emilys', Validators.required], 
    password: ['emilyspass', Validators.required]
  });

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

 onSubmit() {
  if (this.loginForm.invalid) return;

  const credentials = this.loginForm.getRawValue(); 

  if (credentials.username && credentials.password) {
    this.auth.login({
      username: credentials.username,
      password: credentials.password
    }).subscribe({
      next: () => this.router.navigate(['/profile']),
      error: (err) => {
        console.error(err);
        this.errorMsg = 'Login failed — check credentials or network.';
        alert(this.errorMsg);
      }
    });
  }
}

}
