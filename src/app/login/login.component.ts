import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // ✅ add RouterModule
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule], // ✅ include RouterModule
  templateUrl: './login.html'
})
export class LoginComponent {
  model = { email: '', password: '' };
  showPassword = false;

  constructor(private auth: AuthService, private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  login() {
    this.auth.login(this.model).subscribe({
      next: (res: any) => {
        localStorage.setItem('user', JSON.stringify(res));

        if (res.role === 'Doctor') this.router.navigate(['/doctor-dashboard']);
        else if (res.role === 'Patient') this.router.navigate(['/patient-dashboard']);
        else if (res.role === 'Admin') this.router.navigate(['/admin']);
        else this.router.navigate(['/home']);
      },
      error: (err: any) => alert(err?.error?.message || 'Login failed')
    });
  }
}
