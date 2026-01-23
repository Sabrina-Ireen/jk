import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
    selector: 'app-upcoming-appointments',
    standalone: true,
    imports: [CommonModule, HttpClientModule],
    templateUrl: './upcoming-appointments.component.html'
})
export class UpcomingAppointmentsComponent implements OnInit {

    appointments: any[] = [];
    user: any = {};

    constructor(private http: HttpClient, private router: Router, private cdr: ChangeDetectorRef) { }

    ngOnInit(): void {
        const storedUser = localStorage.getItem('user');
        if (!storedUser) {
            this.router.navigate(['/login']);
            return;
        }
        this.user = JSON.parse(storedUser);
        this.fetchAppointments();
    }

    fetchAppointments() {
        const patientId = this.user.id || this.user.Id;
        this.http.get<any[]>(`http://localhost:5120/api/Appointments/Patient/${patientId}`)
            .subscribe({
                next: (res) => {
                    this.appointments = res || [];
                    this.cdr.markForCheck();
                    this.cdr.detectChanges();

                    setTimeout(() => {
                        this.cdr.detectChanges();
                    }, 100);
                },
                error: (err) => console.error('Error fetching appointments', err)
            });
    }

    joinSession(link: string) {
        if (link) {
            window.open(link, '_blank');
        } else {
            alert('Link is not available yet.');
        }
    }

    goBack() {
        this.router.navigate(['/patient-dashboard']);
    }

    viewPrescription(appointmentId: number) {
        this.router.navigate(['/patient-prescriptions'], { queryParams: { appointmentId } });
    }

}
