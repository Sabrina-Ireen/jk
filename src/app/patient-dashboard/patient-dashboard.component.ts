import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-patient-dashboard',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './patient-dashboard.component.html'
})
export class PatientDashboardComponent implements OnInit {
  user: any = {};
  appointments: any[] = [];
  recentPrescriptions: any[] = [];
  topRecommendation: any = null;

  constructor(private router: Router, private http: HttpClient, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');

    if (!storedUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.user = JSON.parse(storedUser);
    this.fetchDashboardData();
  }

  fetchDashboardData() {
    const patientId = this.user.id || this.user.Id;
    this.http.get<any>(`http://localhost:5120/api/Patients/Dashboard/${patientId}`)
      .subscribe({
        next: (res) => {
          this.appointments = res.upcomingAppointments || [];
          this.recentPrescriptions = res.recentPrescriptions || [];
          this.topRecommendation = res.topRecommendation || null;

          // Sync user data with latest from API
          if (res.patient) {
            this.user = { ...this.user, ...res.patient };
          }

          this.cdr.markForCheck();
          this.cdr.detectChanges();

          setTimeout(() => {
            this.cdr.detectChanges();
          }, 100);
        },
        error: (err) => console.error('Error fetching dashboard data', err)
      });
  }



  logout(): void {
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  goHome(): void {
    this.router.navigate(['/home']);
  }

  startQuiz(): void {
    this.router.navigate(['/ai-quiz']);
  }
  goToAllDoctors() {
    this.router.navigate(['/patient-doctors']);
  }
  goToDoctors(): void {
    this.router.navigate(['/patient-doctors']);
  }

  goToUpcoming(): void {
    this.router.navigate(['/upcoming-appointments']);
  }
  goToPrescriptions(): void {
    this.router.navigate(['/patient-prescriptions']);
  }

  joinSession(link: string, event: Event): void {
    event.stopPropagation(); // prevent card click
    if (link) {
      window.open(link, '_blank');
    }
  }

}
