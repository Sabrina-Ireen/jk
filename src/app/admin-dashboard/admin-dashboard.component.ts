import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AdminService } from '../admin/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-dashboard.component.html'
})
export class AdminDashboardComponent implements OnInit {
  counts: any = null; // Start with null
  loading = true;      // Add loading flag

  constructor(private adminService: AdminService,private cdr:ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData() {
    this.loading = true;
    this.adminService.getCounts().subscribe({
      next: (res) => {
        console.log('Counts from backend:', res);
        this.counts = res;      // Save data
        this.loading = false;   // Done loading
        this.cdr.detectChanges(); // Manually trigger change detection
      },
      error: (err) => {
        console.error('Failed to load counts', err);
        this.loading = false;
      }
    });
  }
}
