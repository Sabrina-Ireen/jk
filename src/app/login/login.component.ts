import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  model = {
    email: '',
    password: ''
  };

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  login(): void {
    if (!this.model.email || !this.model.password) {
      alert('Email and password are required');
      return;
    }

    this.auth.login(this.model).subscribe({
      next: (res: any) => {
        localStorage.setItem('user', JSON.stringify(res));

        if (res.role === 'Patient') {
          this.router.navigate(['/patient-dashboard']);
        } else {
          this.router.navigate(['/home']);
        }
      },
      error: (err: any) => {
        alert(err?.error?.message || 'Login failed');
      }
    });
  }
}
