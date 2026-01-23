import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule, NgFor, NgIf } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-admin-doctors',
  standalone: true,
  imports: [CommonModule, NgFor, NgIf, FormsModule],
  templateUrl: './admin-doctors.component.html'
})
export class AdminDoctorsComponent implements OnInit {

  doctors: any[] = [];
  specializations: any[] = [];

  // Modal controls
  showAddDoctorModal = false;
  showEditDoctorModal = false;

  // Form models
  newDoctor = { fullName: '', email: '', specialization: '', password: '', role: 'Doctor' };
  editDoctor: any = { id: 0, fullName: '', email: '', specialization: '' };

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.loadDoctors();
    this.loadSpecializations();
  }

  // --------------------
  // Load doctors
  // --------------------
  loadDoctors() {
    this.adminService.getDoctors().subscribe({
      next: (res: any) => {
        this.doctors = res;
        this.cdr.detectChanges();
        setTimeout(() => this.cdr.detectChanges(), 100);
        setTimeout(() => this.cdr.detectChanges(), 500);
      },
      error: (err) => console.error('Error in loadDoctors:', err),
      complete: () => this.cdr.detectChanges()
    });
  }

  // --------------------
  // Load specializations
  // --------------------
  loadSpecializations() {
    this.adminService.getSpecializations().subscribe({
      next: (res) => this.specializations = res,
      error: (err) => console.error(err)
    });
  }

  // --------------------
  // Add Doctor
  // --------------------
  openAddDoctorForm() {
    this.newDoctor = { fullName: '', email: '', specialization: '', password: '', role: 'Doctor' };
    this.showAddDoctorModal = true;
  }

  closeAddModal() {
    this.showAddDoctorModal = false;
  }

  addDoctor() {
    if (!this.newDoctor.fullName || !this.newDoctor.email || !this.newDoctor.specialization || !this.newDoctor.password) {
      alert("All fields are required");
      return;
    }

    this.adminService.addDoctor({
      FullName: this.newDoctor.fullName,
      Email: this.newDoctor.email,
      Specialization: this.newDoctor.specialization,
      Password: this.newDoctor.password,
      Role: this.newDoctor.role
    }).subscribe({
      next: () => {
        alert("Doctor added successfully!");
        this.closeAddModal();
        this.loadDoctors();
      },
      error: (err) => console.error("Error adding doctor", err)
    });
  }

  // --------------------
  // Edit Doctor
  // --------------------
 openEditDoctorForm(doctor: any) {
  this.editDoctor = {
    id: doctor.id || doctor.Id,
    fullName: doctor.fullName || doctor.FullName,
    email: doctor.email || doctor.Email,
    specialization: doctor.specialization || doctor.Specialization
  };
  this.showEditDoctorModal = true;
}


  closeEditModal() {
    this.showEditDoctorModal = false;
  }

  updateDoctor() {
    if (!this.editDoctor.fullName || !this.editDoctor.email || !this.editDoctor.specialization) {
      alert("All fields are required");
      return;
    }

    const updatePayload = {
      FullName: this.editDoctor.fullName,
      Email: this.editDoctor.email,
      Specialization: this.editDoctor.specialization
    };

    this.adminService.updateDoctor(this.editDoctor.id, updatePayload).subscribe({
      next: () => {
        alert("Doctor updated successfully!");
        this.closeEditModal();
        this.loadDoctors();
      },
      error: (err) => console.error("Error updating doctor", err)
    });
  }

  // --------------------
  // Delete Doctor
  // --------------------
  deleteDoctor(id: number) {
    if (!confirm("Are you sure you want to delete this doctor?")) return;

    this.adminService.deleteDoctor(id).subscribe({
      next: () => {
        alert("Doctor deleted successfully!");
        this.loadDoctors();
        this.cdr.detectChanges();
      },
      error: (err) => console.error("Error deleting doctor", err)
    });
  }
}
