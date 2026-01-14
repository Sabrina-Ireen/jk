import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService, Specialization } from '../admin/admin.service';

@Component({
  selector: 'app-admin-specialization',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './admin-specialization.component.html'
})
export class AdminSpecializationComponent implements OnInit {

  // ===== Data =====
  specializations: Specialization[] = [];
  newSpecialization: Partial<Specialization> = { name: '' };
  editSpecialization: Specialization = { id: 0, name: '' };

  // ===== Modals =====
  showAddSpecializationModal = false;
  showEditSpecializationModal = false;

  constructor(private adminService: AdminService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadSpecializations();
  }

  // ===== Load =====
  loadSpecializations() {
  this.adminService.getSpecializations().subscribe(
    res => {
      this.specializations = res;
      this.cdr.detectChanges(); // <-- Add this
    },
    err => console.error(err)
  );
}


  // ===== Add =====
  openAddSpecializationForm() {
    this.newSpecialization = { name: '' };
    this.showAddSpecializationModal = true;
  }

  addSpecialization() {
    if (!this.newSpecialization.name) return;
    this.adminService.addSpecialization({ name: this.newSpecialization.name }).subscribe(() => {
      this.loadSpecializations();
      this.cdr.detectChanges();
      this.closeModal();
    });
  }

  // ===== Edit =====
  openEditSpecializationForm(spec: Specialization) {
    this.editSpecialization = { ...spec };
    this.showEditSpecializationModal = true;
  }

  updateSpecialization() {
    if (!this.editSpecialization.name) return;
    this.adminService.updateSpecialization(this.editSpecialization.id, { name: this.editSpecialization.name }).subscribe(() => {
      this.loadSpecializations();
      this.cdr.detectChanges();
      this.closeModal();
    });
  }

  // ===== Delete =====
  deleteSpecialization(id: number) {
    if (!confirm('Delete this specialization?')) return;
    this.adminService.deleteSpecialization(id).subscribe(() => {
      this.loadSpecializations();
      this.cdr.detectChanges();
    });
  }

  // ===== Close Modals =====
  closeModal() {
    this.showAddSpecializationModal = false;
    this.showEditSpecializationModal = false;
  }

}
