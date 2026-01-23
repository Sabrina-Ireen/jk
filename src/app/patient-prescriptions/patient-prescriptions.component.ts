import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-patient-prescriptions',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  template: `
    <div class="min-h-screen bg-gray-100 p-8 flex items-center justify-center">
      <div class="w-full max-w-2xl bg-white p-8 rounded-xl shadow-lg space-y-6">
        
        <div class="flex items-center justify-between border-b pb-4">
            <h2 class="text-2xl font-bold text-gray-700">My Prescriptions</h2>
            <button (click)="goBack()"
                class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-300">
                Back
            </button>
        </div>

        <div *ngIf="loading" class="text-center py-10">
            <p class="text-gray-500 italic">Finding your prescriptions...</p>
        </div>

        <div *ngIf="!loading && prescriptions.length === 0" class="text-center py-10">
            <p class="text-gray-500">No prescriptions found.</p>
        </div>

        <div *ngIf="!loading && prescriptions.length > 0" class="space-y-6">
            <div *ngFor="let p of prescriptions" class="p-8 border rounded-2xl shadow-sm border-gray-100 bg-white">
                <div class="flex justify-between items-start mb-6 border-b border-gray-50 pb-4">
                    <div>
                        <p class="text-xl font-bold text-gray-900">{{ p.doctorName || 'Doctor' }}</p>
                        <p class="text-sm text-gray-400 mt-1">{{ p.createdAt | date:'fullDate' }}</p>
                    </div>
                    <span class="text-xs px-3 py-1 bg-green-100 text-green-600 rounded-full font-bold uppercase tracking-wide">Issued</span>
                </div>

                <div class="space-y-6">
                    <div *ngIf="p.diagnosis">
                        <label class="text-[10px] font-black text-[#FF7D54] uppercase tracking-widest block mb-2">Diagnosis</label>
                        <div class="bg-gray-50 p-4 rounded-xl text-gray-800 text-sm font-medium border border-gray-50">
                            {{ p.diagnosis }}
                        </div>
                    </div>

                    <div *ngIf="p.medicines">
                        <label class="text-[10px] font-black text-[#FF7D54] uppercase tracking-widest block mb-2">Medicines</label>
                        <div class="bg-gray-50 p-4 rounded-xl border border-gray-50 text-gray-800 whitespace-pre-wrap font-mono text-xs leading-relaxed">
                            {{ p.medicines }}
                        </div>
                    </div>

                    <div *ngIf="p.notes">
                        <label class="text-[10px] font-black text-[#FF7D54] uppercase tracking-widest block mb-2">Doctor's Notes</label>
                        <div class="bg-gray-50 p-4 rounded-xl text-gray-600 text-sm italic border border-gray-50">
                            {{ p.notes }}
                        </div>
                    </div>
                </div>
            </div>
        </div>

      </div>
    </div>
  `,
  styles: []
})
export class PatientPrescriptionsComponent implements OnInit {
  prescriptions: any[] = [];
  loading = true;
  user: any = {};
  appointmentId: number | null = null;
  private apiUrl = 'http://localhost:5120/api/Prescriptions';

  constructor(
    private http: HttpClient,
    private router: Router,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      this.router.navigate(['/login']);
      return;
    }
    this.user = JSON.parse(storedUser);

    this.route.queryParams.subscribe(params => {
      this.appointmentId = params['appointmentId'] ? Number(params['appointmentId']) : null;
      this.fetchPrescriptions();
    });
  }

  fetchPrescriptions(): void {
    const patientId = this.user.id || this.user.Id;
    let url = `${this.apiUrl}/Patient/${patientId}`;

    // If specific appointment requested
    if (this.appointmentId) {
      url = `${this.apiUrl}/Appointment/${this.appointmentId}`;
    }

    this.http.get<any>(url).subscribe({
      next: (res) => {
        console.log('Prescription Data:', res);
        // Backend returns single object for Appointment endpoint, array for Patient endpoint
        this.prescriptions = Array.isArray(res) ? res : [res];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.error('Error fetching prescriptions', err);
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  goBack(): void {
    this.router.navigate(['/patient-dashboard']);
  }
}
