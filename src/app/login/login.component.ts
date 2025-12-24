import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.html'
})
export class LoginComponent {
  model = { email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  login() {
  this.authService.login(this.model).subscribe({
    next: (res: any) => {
      alert(res.message); // show backend message
      this.router.navigate(['/home']);
    },
    error: (err) => {
      console.error(err);           // show full error
      alert(err.error || 'Login failed'); // show backend error if exists
    }
  });
}
}

