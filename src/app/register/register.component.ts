import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  model = { fullName: '', email: '', password: '' };

  constructor(private auth: AuthService, private router: Router) {}

  register() {
    if (!this.model.fullName || !this.model.email || !this.model.password) {
      alert('Please fill all fields');
      return;
    }

    this.auth.register(this.model).subscribe({
      next: (res: any) => {
        alert('Registered successfully!');
        this.router.navigate(['/login']); // redirect to login
      },
      error: (err) => alert('Registration failed! Try again.')
    });
  }
}
