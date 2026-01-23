import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface ReportStats {
  totalAppointments: number;
  completed: number;
  pending: number;
  cancelled: number;
}

interface TopDoctor {
  DoctorName: string;
  Specialization: string;
  TotalAppointments: number;
}

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-reports.component.html'
})
export class AdminReportsComponent implements OnInit {

  private apiUrl = 'http://localhost:5120/api/Admin/Reports';

  reports: ReportStats = {
    totalAppointments: 0,
    completed: 0,
    pending: 0,
    cancelled: 0
  };

  topDoctors: TopDoctor[] = [];

  loading = false;

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    this.loadReports();
  }

  loadReports(): void {
    this.loading = true;

    this.http.get<any>(this.apiUrl).subscribe({
      next: (res) => {
        console.table(res);

        this.reports.totalAppointments = res.totalAppointments;
        this.reports.completed = res.completed;
        this.reports.pending = res.pending;
        this.reports.cancelled = res.cancelled;

        this.topDoctors = res.topDoctors ?? [];

        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Failed to load reports', err);
        this.loading = false;
      }
    });
  }
}
