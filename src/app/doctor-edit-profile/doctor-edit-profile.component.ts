import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorDashboardService, DoctorProfile } from '../doctor-dashboard/doctor-dashboard.service';

@Component({
  selector: 'app-doctor-edit-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-edit-profile.component.html'
})
export class DoctorEditProfileComponent implements OnInit {

  profile: DoctorProfile = {
    id: 0,
    fullName: '',
    email: '',
    specialization: '',
    isActive: true
  };

  user = JSON.parse(localStorage.getItem('user') || '{}');

  constructor(private dashboardService: DoctorDashboardService, private router: Router) {}

  ngOnInit(): void {
    this.dashboardService.getDoctorProfile(this.user.id)
      .subscribe(res => this.profile = res);
  }

  save() {
  const doctorId = this.user.id;

  this.dashboardService.updateDoctorProfile(doctorId, this.profile).subscribe({
    next: () => {
      alert('Profile updated successfully');
  this.router.navigate(['/doctor-dashboard']);
      // Update localStorage so app shows new name/specialization
      const updatedUser = { ...this.user, ...this.profile };
      localStorage.setItem('user', JSON.stringify(updatedUser));

      // Optional: refresh profile from backend to be safe
      this.dashboardService.getDoctorProfile(doctorId).subscribe(res => {
        this.profile = res;
      });
    },
    error: (err) => {
      console.error(err);
      alert('Failed to update profile');
    }
  });
}

}
