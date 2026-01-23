import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../admin/admin.service';

@Component({
  selector: 'app-admin-patients',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-patients.component.html'
})
export class AdminPatientsComponent implements OnInit {
  patients: any[] = [];
  showAddPatientModal = false;
  showEditPatientModal = false;

  newPatient: any = { FullName: '', Email: '', Password: '' };
  editPatient: any = { Id: 0, FullName: '', Email: '' };

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadPatients();
  }

  loadPatients() {
    this.adminService.getPatients().subscribe({
      next: (res) => {
        this.patients = res;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  // ---------------- Add Patient ----------------
  openAddPatientForm() {
    this.newPatient = { FullName: '', Email: '', Password: '' };
    this.showAddPatientModal = true;
  }

  addPatient() {
    this.adminService.addPatient(this.newPatient).subscribe({
      next: (res) => {
        this.loadPatients();
        this.showAddPatientModal = false;
      },
      error: (err) => console.error(err)
    });
  }

  // ---------------- Edit Patient ----------------
  openEditPatientForm(patient: any) {
    this.editPatient = { ...patient }; // clone patient object
    this.showEditPatientModal = true;
  }

  updatePatient() {
    const updateDto = { FullName: this.editPatient.FullName, Email: this.editPatient.Email };
    this.adminService.updatePatient(this.editPatient.Id, updateDto).subscribe({
      next: () => {
        const index = this.patients.findIndex(p => p.Id === this.editPatient.Id);
        if (index !== -1) this.patients[index] = { ...this.patients[index], ...updateDto };
        this.showEditPatientModal = false;
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  // ---------------- Delete Patient ----------------
  deletePatient(id: number) {
    if (!confirm('Are you sure you want to delete this patient?')) return;

    this.adminService.deletePatient(id).subscribe({
      next: () => {
        this.patients = this.patients.filter(p => p.Id !== id);
        this.cdr.detectChanges();
      },
      error: (err) => console.error(err)
    });
  }

  closeModal() {
    this.showAddPatientModal = false;
    this.showEditPatientModal = false;
  }
}
