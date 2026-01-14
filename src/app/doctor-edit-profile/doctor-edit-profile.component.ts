import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

  constructor(private dashboardService: DoctorDashboardService) {}

  ngOnInit(): void {
    this.dashboardService.getDoctorProfile(this.user.id)
      .subscribe(res => this.profile = res);
  }

  save() {
    this.dashboardService.updateDoctorProfile(this.user.id, this.profile)
      .subscribe(() => alert('Profile updated successfully'));
  }
}
