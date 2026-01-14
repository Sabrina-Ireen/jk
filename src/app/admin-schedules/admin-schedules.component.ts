import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-schedules',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-schedules.component.html'
})
export class AdminSchedulesComponent implements OnInit {

  apiUrl = 'https://localhost:7051/api/Admin/Schedules';

  schedules: any[] = [];

  showAddScheduleModal = false;
  showEditScheduleModal = false;

  newSchedule = {
    doctorId: 0,
    day: '',
    startTime: '',
    endTime: ''
  };

  editSchedule: any = {};

  constructor(private http: HttpClient, private cdr:ChangeDetectorRef) {}

  ngOnInit() {
    this.loadSchedules();
  }

  // ===== GET =====
  loadSchedules() {
    this.http.get<any[]>(this.apiUrl).subscribe(res => {
      this.schedules = res;
      this.cdr.detectChanges();
    });
  }

  // ===== ADD =====
  openAddScheduleForm() {
    this.newSchedule = {
      doctorId: 0,
      day: '',
      startTime: '',
      endTime: ''
    };
    this.showAddScheduleModal = true;
  }

  addSchedule() {
    this.http.post(this.apiUrl, this.newSchedule).subscribe(() => {
      this.closeModal();
      this.loadSchedules();
      this.cdr.detectChanges();
    });
  }

  // ===== EDIT =====
  openEditScheduleForm(schedule: any) {
    this.editSchedule = { ...schedule };
    this.showEditScheduleModal = true;
  }

  updateSchedule() {
    this.http.put(
      `${this.apiUrl}/${this.editSchedule.ScheduleId}`,
      {
        doctorId: this.editSchedule.DoctorId,
        day: this.editSchedule.Day,
        startTime: this.editSchedule.StartTime,
        endTime: this.editSchedule.EndTime
      }
    ).subscribe(() => {
      this.closeModal();
      this.loadSchedules();
      this.cdr.detectChanges();
    });
  }

  // ===== DELETE =====
  deleteSchedule(id: number) {
    if (!confirm('Delete this schedule?')) return;

    this.http.delete(`${this.apiUrl}/${id}`).subscribe(() => {
      this.loadSchedules();
      this.cdr.detectChanges();
    });
  }

  // ===== MODAL =====
  closeModal() {
    this.showAddScheduleModal = false;
    this.showEditScheduleModal = false;
  }
}  