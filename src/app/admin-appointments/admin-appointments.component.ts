import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-admin-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-appointments.component.html'
})
export class AdminAppointmentsComponent implements OnInit {

  apiUrl = 'https://localhost:7051/api/Admin/Appointments';

  appointments: any[] = [];

  showAddModal = false;
  showEditModal = false;

  newAppointment = {
    patientId: 0,
    doctorId: 0,
    date: '',
    time: '',
    status: 'Pending'
  };

  editAppointment: any = {};

  constructor(private http: HttpClient, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadAppointments();
  }

  // ===== GET all appointments =====
  loadAppointments() {
    this.http.get<any[]>(this.apiUrl).subscribe(res => {
      // Map backend fields to frontend fields
      this.appointments = res.map(a => ({
        Id: a.AppointmentId,
        PatientId: a.PatientId,
        PatientName: a.PatientName,
        DoctorId: a.DoctorId,
        DoctorName: a.DoctorName,
        Date: a.AppointmentDate,
        Time: a.SlotTime,
        Status: a.Status,
        SessionLink: a.SessionLink
      }));
      this.cdr.detectChanges();
    });
  }

  // ===== ADD =====
  openAddForm() {
    this.newAppointment = {
      patientId: 0,
      doctorId: 0,
      date: '',
      time: '',
      status: 'Pending'
    };
    this.showAddModal = true;
  }

  addAppointment() {
    const payload = {
      DoctorId: this.newAppointment.doctorId,
      PatientId: this.newAppointment.patientId,
      AppointmentDate: this.newAppointment.date,
      SlotTime: this.newAppointment.time,
      SessionLink: "",
      Status: this.newAppointment.status
    };

    this.http.post(this.apiUrl, payload).subscribe(() => {
      this.closeModal();
      this.loadAppointments();
      this.cdr.detectChanges();
    });
  }

  // ===== EDIT =====
  openEditForm(app: any) {
    this.editAppointment = { ...app };
    this.showEditModal = true;
  }

  updateAppointment() {
    const payload = {
      DoctorId: this.editAppointment.DoctorId,
      PatientId: this.editAppointment.PatientId,
      AppointmentDate: this.editAppointment.Date,
      SlotTime: this.editAppointment.Time,
      SessionLink: this.editAppointment.SessionLink || "",
      Status: this.editAppointment.Status
    };

    this.http.put(`${this.apiUrl}/${this.editAppointment.Id}`, payload).subscribe(() => {
      this.closeModal();
      this.loadAppointments();
      this.cdr.detectChanges();
    });
  }

  // ===== DELETE =====
 deleteAppointment(id: number) {
  if (!confirm('Delete this appointment?')) return;

  this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' }).subscribe({
    next: () => {
      // remove locally
      this.appointments = this.appointments.filter(a => a.Id !== id);
    },
    error: (err) => console.error(err)
  });
}




  // ===== MODAL =====
  closeModal() {
    this.showAddModal = false;
    this.showEditModal = false;
  }
}
