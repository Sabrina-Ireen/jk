import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { DoctorDashboardService } from '../doctor-dashboard/doctor-dashboard.service';

@Component({
  selector: 'app-doctor-prescription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-prescription.component.html'
})
export class DoctorPrescriptionComponent implements OnInit {

  prescription = {
    patientId: null,
    diagnosis: '',
    notes: '',
    medicines: ''
  };

  patients: { patientId: number; fullName: string }[] = [];

  constructor(
    private router: Router,
    private dashboardService: DoctorDashboardService,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const doctorId = JSON.parse(localStorage.getItem('user') || '{}').id;

    this.dashboardService.getDoctorPatientsUpcoming(doctorId).subscribe({
      next: (res: any[]) => {
        console.log('Patients response:', res);
        this.patients = res.map(p => ({
          patientId: p.patientId || p.PatientId,
          fullName: p.patientName || p.PatientName
        }));
        this.cdr.detectChanges();
      },
      error: err => console.error('Failed to load patients:', err)
    });
  }
  savePrescription() {
    if (!this.prescription.patientId) {
      alert('Please select a patient.');
      return;
    }

    const doctorId = JSON.parse(localStorage.getItem('user') || '{}').id;
    const payload = {
      ...this.prescription,
      patientId: Number(this.prescription.patientId),
      doctorId
    };

    this.dashboardService.savePrescription(payload).subscribe({
      next: () => {
        alert('Prescription saved successfully!');
        this.router.navigate(['/doctor-dashboard']);
        this.cdr.detectChanges();
      },
      error: (err: any) => {
        console.error(err);
        alert('Failed to save prescription');
      }
    });
  }

  cancel() {
    this.router.navigate(['/doctor-dashboard']);
  }
}




