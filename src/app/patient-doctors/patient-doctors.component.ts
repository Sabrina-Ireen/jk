import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

interface Doctor {
  id: number;
  fullName: string;
  specialization: string;
  email: string;
  isActive: boolean;
  fee: number;
  availableDays: string; // ✅ Added
}

@Component({
  selector: 'app-patient-doctors',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './patient-doctors.component.html',
})
export class PatientDoctorsComponent implements OnInit {
  doctors: Doctor[] = [];
  filteredDoctors: Doctor[] = [];
  loading = true;
  error: string | null = null;
  selectedSpecialization = '';

  constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors() {
    this.loading = true;
    this.http.get<Doctor[]>('http://localhost:5120/api/Doctors/All').subscribe({
      next: (res) => {
        console.table(res);
        this.doctors = res;
        this.filteredDoctors = res;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error(err);
        this.error = 'Failed to load doctors';
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  filterDoctors() {
    if (!this.selectedSpecialization) {
      this.filteredDoctors = this.doctors;
    } else {
      this.filteredDoctors = this.doctors.filter(
        (d) => d.specialization === this.selectedSpecialization
      );
    }
    this.cdr.detectChanges();
  }

  bookDoctor(doctor: Doctor) {
    localStorage.setItem('doctor', JSON.stringify(doctor));
    this.router.navigate(['/book-appointment'], {
      state: { doctor, category: doctor.specialization },
    });
  }
}
