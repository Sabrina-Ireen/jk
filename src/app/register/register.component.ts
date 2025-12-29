import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.html'
})
export class RegisterComponent {
  model = { fullName: '', email: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    if (!this.model.fullName || !this.model.email || !this.model.password) {
      alert('All fields are required!');
      return;
    }

    this.auth.register(this.model).subscribe({
      next: () => {
        alert('Registration successful! Please log in.');
        this.router.navigate(['/login']);
      },
      error: (err) => alert(err?.error?.message || 'Registration failed')
    });
  }
}
