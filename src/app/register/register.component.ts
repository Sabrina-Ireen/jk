import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './register.html'
})
export class RegisterComponent {
  model = { fullName: '', email: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

  register() {
    // ✅ Check for empty fields
    if (!this.model.fullName.trim() || !this.model.email.trim() || !this.model.password.trim()) {
      alert('All fields are required!');
      return;
    }

    // ✅ Email format validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.model.email)) {
      alert('Please enter a valid email address!');
      return;
    }

    // Call backend
    this.authService.register(this.model).subscribe({
      next: (res: any) => {
        const message = res?.text || 'Registration successful';
        alert(message);
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error(err);
        let errorMessage = 'Registration failed';
        if (err.error) {
          if (err.error.text) {
            errorMessage = err.error.text;
          } else if (typeof err.error === 'string') {
            errorMessage = err.error;
          } else {
            errorMessage = JSON.stringify(err.error);
          }
        }
        alert(errorMessage);
      }
    });
  }
}
