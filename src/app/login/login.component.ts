import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html'
})
export class LoginComponent {
  model = { email: '', password: '' };

  constructor(private auth: AuthService) {}

  login() {
    this.auth.login(this.model).subscribe({
      next: () => alert('Login successful'),
      error: () => alert('Invalid credentials')
    });
  }
}
