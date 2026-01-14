import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-reports',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-reports.component.html'
})
export class AdminReportsComponent implements OnInit {

  apiUrl = 'https://localhost:7051/api/Admin/Reports';

  reports: any = {
    totalAppointments: 0,
    completed: 0,
    pending: 0,
    cancelled: 0
  };

  topDoctors: any[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadReports();
  }

  // ===== GET REPORTS (same as schedules) =====
  loadReports() {
    this.http.get<any>(this.apiUrl).subscribe(res => {
      console.table(res);


      // Map PascalCase → camelCase
      this.reports.totalAppointments = res.totalAppointments;
      this.reports.completed = res.completed;
      this.reports.pending = res.pending;
      this.reports.cancelled = res.cancelled;

      this.topDoctors = res.topDoctors ?? [];

      // Force UI update
      this.cdr.detectChanges();
    });
  }
}
