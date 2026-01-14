import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DoctorGuard implements CanActivate {

  constructor(private router: Router) {}

  canActivate(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (user.role === 'Doctor') {
      return true; // ✅ allow access
    }

    this.router.navigate(['/login']); // ❌ redirect to login
    return false;
  }
}
