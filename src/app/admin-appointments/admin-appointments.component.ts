import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-admin-appointments',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-appointments.component.html'
})
export class AdminAppointmentsComponent implements OnInit {

  appointments: any[] = [];
  patients: any[] = [];
  doctors: any[] = [];

  showAddModal = false;
  showEditModal = false;

  newAppointment = {
    patientId: '',
    doctorId: '',
    date: '',
    time: '',
    sessionLink: '',
    status: 'Pending'
  };

  editAppointment: any = {};

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadAppointments();
        this.loadPatients();
    this.loadDoctors();
  }

  // ----------------
  // Load Data
  // ----------------
  loadAppointments() {
  this.adminService.getAppointments().subscribe(res => {
    this.appointments = res
      .map(a => ({
        Id: a.AppointmentId,
        PatientId: a.PatientId,
        PatientName: a.PatientName,
        DoctorId: a.DoctorId,
        DoctorName: a.DoctorName,
        Date: a.AppointmentDate,
        Time: a.SlotTime,
        Status: a.Status,
        SessionLink: a.SessionLink
      }))
      // ✅ SORT BY ID ASC → NEW AT BOTTOM
      .sort((a, b) => a.Id - b.Id);

    this.cdr.detectChanges();
  });
}


  loadPatients() {
    this.adminService.getPatients().subscribe(res => this.patients = res);
  }

  loadDoctors() {
    this.adminService.getDoctors().subscribe(res => this.doctors = res);
  }

  // ----------------
  // Add Appointment
  // ----------------
  openAddForm() {
    this.newAppointment = { patientId: '', doctorId: '', date: '', time: '', sessionLink: '', status: 'Pending' };
    this.showAddModal = true;

    // Load dropdowns

  }

  addAppointment() {
    const payload = {
      DoctorId: this.newAppointment.doctorId,
      PatientId: this.newAppointment.patientId,
      AppointmentDate: this.newAppointment.date,
      SlotTime: this.newAppointment.time,
      SessionLink: this.newAppointment.sessionLink,
      Status: this.newAppointment.status
    };

    this.adminService.addAppointment(payload).subscribe(() => {
      this.closeModal();
      this.loadAppointments();
      this.cdr.detectChanges();
    });
  }

  // ----------------
  // Edit Appointment
  // ----------------
  openEditForm(app: any) {
    this.editAppointment = { ...app };
    this.showEditModal = true;

    // Load dropdowns
 
  }

  updateAppointment() {

    console.log('EDIT CLICKED', this.editAppointment);
  // 🔹 FORMAT DATE FOR SQL
  const formattedDate = new Date(this.editAppointment.Date)
    .toISOString()
    .split('T')[0]; // yyyy-MM-dd

  const payload = {
    DoctorId: this.editAppointment.DoctorId,
    PatientId: this.editAppointment.PatientId,
    AppointmentDate: formattedDate,
    SlotTime: this.editAppointment.Time,   // MUST be "HH:mm"
    SessionLink: this.editAppointment.SessionLink || '',
    Status: this.editAppointment.Status
  };

  console.log('Update Appointment Payload:', payload); // DEBUG

  this.adminService.updateAppointment(this.editAppointment.Id, payload).subscribe({
    next: () => {

      // 🔹 UPDATE LOCAL ARRAY (like patient update)
      const index = this.appointments.findIndex(
        a => a.AppointmentId === this.editAppointment.Id
      );

      if (index !== -1) {
        this.appointments[index] = {
          ...this.appointments[index],
          ...payload
        };
      }

      this.closeModal();
      this.loadAppointments();
    },
    error: (err) => {
      console.error('Update appointment error:', err);
      alert('Update failed');
    }
  });
}


  // ----------------
  // Delete Appointment
  // ----------------
  deleteAppointment(id: number) {
    if (!confirm('Delete this appointment?')) return;

    this.adminService.deleteAppointment(id).subscribe(() => this.loadAppointments());
    this.loadAppointments();
    this.cdr.detectChanges();
  }

  closeModal() {
    this.showAddModal = false;
    this.showEditModal = false;
  }
}
