import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html'
})
export class RegisterComponent {
  model = { fullName: '', email: '', password: '' };

  constructor(private auth: AuthService) {}

  register() {
    this.auth.register(this.model).subscribe(() => alert('Registered successfully'));
  }
}
