import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoctorDashboardService, DoctorSessionDto } from '../doctor-dashboard/doctor-dashboard.service';

@Component({
  selector: 'app-doctor-session-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './doctor-session-history.component.html'
})
export class DoctorSessionHistoryComponent implements OnInit {

  sessions: DoctorSessionDto[] = [];
  loading = true;

  constructor(private dashboardService: DoctorDashboardService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    const user = JSON.parse(localStorage.getItem('user') || '{}');

    if (!user?.id) {
      console.error('Doctor not logged in');
      return;
    }

    this.dashboardService.getDoctorSessions(user.id).subscribe({
      next: (res: DoctorSessionDto[]) => {
        console.log('Sessions from backend:', res);
        this.sessions = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load sessions', err);
        this.loading = false;
      }
    });
  }
}
