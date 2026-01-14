import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-doctor-prescription',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './doctor-prescription.component.html'
})
export class DoctorPrescriptionComponent {

  prescription = {
    patientId: '',
    diagnosis: '',
    notes: '',
    medicines: ''
  };

  constructor(private router: Router, private http: HttpClient) {}

  savePrescription() {
    const doctorId = JSON.parse(localStorage.getItem('user') || '{}').id;
    const payload = {
      ...this.prescription,
      doctorId: doctorId,
      patientId: Number(this.prescription.patientId)
    };

    this.http.post('https://localhost:7051/api/Prescriptions', payload)
      .subscribe({
        next: (res) => {
          alert('Prescription saved successfully!');
          this.router.navigate(['/doctor-dashboard']);
        },
        error: (err) => {
          console.error(err);
          alert('Failed to save prescription');
        }
      });
  }

  cancel() {
    this.router.navigate(['/doctor-dashboard']);
  }
}
