import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  model = { email: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

  login() {
    if (!this.model.email || !this.model.password) {
      alert('Please enter email and password');
      return;
    }

    this.auth.login(this.model).subscribe({
      next: (res: any) => {
        alert('Login successful!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
  alert(err.error || 'Invalid email or password');
}

    });
  }
}
