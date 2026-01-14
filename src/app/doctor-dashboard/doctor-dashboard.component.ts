import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { DoctorDashboardService, DoctorSlotDto } from './doctor-dashboard.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-doctor-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './doctor-dashboard.component.html'
})
export class DoctorDashboardComponent implements OnInit {
  user = { fullName: '', id: 0 };
  slots: any[] = [];
constructor(
  private dashboardService: DoctorDashboardService, // <-- correct service
  private cdr: ChangeDetectorRef,
  private router: Router
) {}


 ngOnInit(): void {
  const userData = JSON.parse(localStorage.getItem('user') || '{}');
  if (userData.role === 'Doctor') {
    this.user = userData;
    this.loadTodaySlots(); // <-- call the dashboard service
  }
}

loadTodaySlots() {
  this.dashboardService.getTodaySlots(this.user.id).subscribe({
    next: (res) => {
      console.log('Doctor slots:', res);
      this.slots = res;
      this.cdr.detectChanges();
    },
    error: (err) => console.error('Failed to load slots', err)
  });
}

  logout() {
  localStorage.removeItem('user');
  this.router.navigate(['/login']);
}
}
