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

  // Modal controls
  showAddDoctorModal = false;
  showEditDoctorModal = false;

  // Form models
  newDoctor = { FullName: '', Email: '', Specialization: '', Password: '', Role: 'Doctor' };
  editDoctor: any = { Id: 0, FullName: '', Email: '', Specialization: '' };

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadDoctors();
  }

  // Load doctors from backend
  loadDoctors() {
    this.adminService.getDoctors().subscribe({
      next: (res) => this.doctors = res,
      error: (err) => console.error(err),
      complete: () => this.cdr.detectChanges()
    });
  }

  // --------------------
  // Add Doctor
  // --------------------
  openAddDoctorForm() {
    this.showAddDoctorModal = true;
    this.newDoctor = { FullName: '', Email: '', Specialization: '', Password: '', Role: 'Doctor' };

  }

  closeAddModal() {
    this.showAddDoctorModal = false;
  }

  addDoctor() {
    if (!this.newDoctor.FullName || !this.newDoctor.Email || !this.newDoctor.Specialization || !this.newDoctor.Password) {
      alert("All fields are required");
      return;
    }

    this.adminService.addDoctor(this.newDoctor).subscribe({
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
    this.editDoctor = { ...doctor }; // clone object
    this.showEditDoctorModal = true;
  }

  closeEditModal() {
    this.showEditDoctorModal = false;
  }

  updateDoctor() {
    if (!this.editDoctor.FullName || !this.editDoctor.Email || !this.editDoctor.Specialization) {
      alert("All fields are required");
      return;
    }

    this.adminService.updateDoctor(this.editDoctor.Id, this.editDoctor).subscribe({
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
