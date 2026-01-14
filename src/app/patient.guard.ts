import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PatientGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user.role === 'Patient') {
      return true; // ✅ allow access
    }

    this.router.navigate(['/login']); // ❌ redirect to login
    return false;
  }
}
