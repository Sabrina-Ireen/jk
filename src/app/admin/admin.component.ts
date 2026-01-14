import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { AdminService } from './admin.service';
import { CommonModule } from '@angular/common';
import { AdminFooterComponent } from '../footer/footer.component';
import { AdminSidebarComponent } from '../sidebar/sidebar.component';
import { AdminHeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule,AdminFooterComponent,AdminSidebarComponent,AdminHeaderComponent,RouterOutlet],
  templateUrl: './admin.component.html',
})
export class AdminComponent implements OnInit {
  doctors: any[] = [];
  patients: any[] = [];
  appointments: any[] = [];
  totalDoctors = 0;
  totalPatients = 0;

  constructor(private adminService: AdminService, private router: Router) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.adminService.getDoctors().subscribe(d => {
      console.log('Doctors:', d); // debug
      this.doctors = d;
    });

    this.adminService.getPatients().subscribe(p => {
      console.log('Patients:', p); // debug
      this.patients = p;
    });

    this.adminService.getAppointments().subscribe(a => {
      console.log('Appointments:', a); // debug
      this.appointments = a;
    });

    this.adminService.getCounts().subscribe(c => {
      console.log('Counts:', c); // debug
      this.totalDoctors = c.totalDoctors;
      this.totalPatients = c.totalPatients;
    });
  }

  getInitials(fullName: string): string {
    if (!fullName) return '';
    return fullName.split(' ').map(n => n[0]).join('');
  }

  goHome() {
    this.router.navigate(['/home']);
  }

  logout() {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }
}
