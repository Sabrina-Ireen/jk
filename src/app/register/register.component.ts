import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router'; // ✅ add RouterModule
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule], // ✅ add RouterModule here
  templateUrl: './register.html'
})
export class RegisterComponent {
  model = { fullName: '', email: '', password: '' };
  showPassword = false;

  constructor(private auth: AuthService, private router: Router) { }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  register() {
    if (!this.model.fullName || !this.model.email || !this.model.password) {
      alert('All fields are required!');
      return;
    }

    this.auth.register(this.model).subscribe({
      next: () => {
        alert('Registration successful! Please log in.');
        this.router.navigate(['/login']); // redirect after registration
      },
      error: (err) => alert(err?.error?.message || 'Registration failed')
    });
  }
}
