import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

interface Doctor {
  id: number;
  name: string;
  specialization: string;
  availableDays: string;
  email: string;
}

@Component({
  selector: 'app-ai-quiz-result',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './ai-quiz-result.component.html'
})
export class AiQuizResultComponent {

  category: string | null = null;
  topDoctors: Doctor[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(private router: Router, private http: HttpClient, private cdr: ChangeDetectorRef) {
    const nav = this.router.getCurrentNavigation();
    this.category = nav?.extras?.state?.['specialization'] || localStorage.getItem('specialization');

    if (this.category) {
      localStorage.setItem('specialization', this.category);
      this.getTopDoctors(this.category);
    } else {
      this.loading = false;
      this.error = "Specialization not found.";
    }
  }

  getTopDoctors(specialization: string) {
    this.loading = true;
    this.error = null;

    const params = { specialization: specialization };

    this.http.get<{ doctors: Doctor[] }>(
      `http://localhost:5120/api/AiQuiz/recommendation`, { params }
    )
      .pipe(
        catchError(err => {
          console.error('API Error:', err);
          this.error = "Failed to fetch doctors.";
          this.loading = false;
          return of({ doctors: [] });
        })
      )
      .subscribe(res => {
        this.topDoctors = res.doctors || [];
        this.loading = false;

        if (this.topDoctors.length === 0 && !this.error) {
          this.error = "No doctors found for this specialization.";
        }
        this.cdr.detectChanges();
        console.log('Doctors loaded:', this.topDoctors);
      });
  }

  goToDashboard() {
    this.router.navigate(['/patient-dashboard']);
  }

  bookAppointment(doctor: Doctor) {
    this.router.navigate(['/book-appointment'], { state: { doctor, category: this.category } });
  }
}
