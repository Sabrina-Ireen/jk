import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-admin-schedules',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-schedules.component.html'
})
export class AdminSchedulesComponent implements OnInit {

  schedules: any[] = [];
  doctors: any[] = [];

  showAddScheduleModal = false;
  showEditScheduleModal = false;

  newSchedule = {
    doctorId: '',
    day: '',
    startTime: '',
    endTime: ''
  };

  editSchedule: any = {};

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    this.loadSchedules();
    this.loadDoctors();
  }

  // --------------------
  // Load schedules
  // --------------------
  loadSchedules() {
    this.adminService.getSchedules().subscribe({
      next: (res) => {
        this.schedules = res;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  // --------------------
  // Load doctors for dropdown
  // --------------------
  loadDoctors() {
    this.adminService.getDoctors().subscribe({
      next: (res) => this.doctors = res,
      error: (err) => console.error(err)
    });
  }

  // --------------------
  // Add Schedule
  // --------------------
  openAddScheduleForm() {
    this.newSchedule = { doctorId: '', day: '', startTime: '', endTime: '' };
    this.showAddScheduleModal = true;
  }

  addSchedule() {
    if (!this.newSchedule.doctorId || !this.newSchedule.day || !this.newSchedule.startTime || !this.newSchedule.endTime) {
      alert('All fields are required');
      return;
    }

    this.adminService.addSchedule(this.newSchedule).subscribe({
      next: () => {
        alert('Schedule added successfully!');
        this.closeModal();
        this.loadSchedules();
      },
      error: (err) => console.error('Error adding schedule', err)
    });
  }

  // --------------------
  // Edit Schedule
  // --------------------
  openEditScheduleForm(schedule: any) {
  // Map DoctorId from backend to doctorId used in ngModel
  this.editSchedule = {
    ScheduleId: schedule.ScheduleId,
    doctorId: schedule.DoctorId, // must match the select [(ngModel)]
    Day: schedule.Day,
    StartTime: schedule.StartTime,
    EndTime: schedule.EndTime
  };
  this.showEditScheduleModal = true;
}


  updateSchedule() {
  // 🔹 Validate required fields
  if (!this.editSchedule.doctorId || !this.editSchedule.Day || !this.editSchedule.StartTime || !this.editSchedule.EndTime) {
    alert("All fields are required");
    return;
  }

  // 🔹 Prepare payload
  const payload = {
    doctorId: this.editSchedule.doctorId,
    day: this.editSchedule.Day,
    startTime: this.editSchedule.StartTime,
    endTime: this.editSchedule.EndTime
  };

  // 🔹 Call service to update
  this.adminService.updateSchedule(this.editSchedule.ScheduleId, payload).subscribe({
    next: () => {
      alert("Schedule updated successfully!");
      this.closeModal(); // Close modal after success
      this.loadSchedules();  // Refresh list
    },
    error: (err) => console.error("Error updating schedule", err)
  });
}


  // --------------------
  // Delete Schedule
  // --------------------
  deleteSchedule(id: number) {
    if (!confirm('Are you sure you want to delete this schedule?')) return;

    this.adminService.deleteSchedule(id).subscribe({
      next: () => {
        alert('Schedule deleted successfully!');
        this.loadSchedules();
      },
      error: (err) => console.error(err)
    });
  }

  // --------------------
  // Close modals
  // --------------------
  closeModal() {
    this.showAddScheduleModal = false;
    this.showEditScheduleModal = false;
  }
}
