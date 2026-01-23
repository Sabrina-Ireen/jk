import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-book-appointment',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './book-appointment.component.html'
})
export class BookAppointmentComponent implements OnInit {

  // ✅ Doctor and booking info
  doctor: any = null;

  selectedDate: string = '';
  selectedSlot: string = '';
  notes: string = '';
  showPaymentModal = false;
  paymentMethod: string = '';

  // ✅ New Fields
  patientName: string = '';
  patientId: number = 0;
  mobile: string = '';
  age: string = '';
  gender: string = '';

  availableSlots: string[] = [];
  private apiUrl = 'http://localhost:5120/api/Appointments';
  private availableSlotsApiUrl = 'http://localhost:5120/api/Appointments/AvailableSlots';

  constructor(
    private router: Router,
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
    // 0️⃣ Load User from Storage
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (user) {
      this.patientId = user.id || user.Id || 0;
      this.patientName = user.fullName || user.FullName || 'Guest';
      this.mobile = user.mobile || '';
    }

    // ✅ Load doctor from navigation state or localStorage
    const nav = this.router.getCurrentNavigation();
    this.doctor = nav?.extras?.state?.['doctor'];

    if (!this.doctor) {
      const storedDoctor = localStorage.getItem('doctor');
      if (storedDoctor) {
        this.doctor = JSON.parse(storedDoctor);
      }
    }

    if (this.doctor) {
      localStorage.setItem('doctor', JSON.stringify(this.doctor));
    }
  }

  // -----------------------------
  // 1️⃣ FORMAT DATE FOR SQL
  private formatDate(date: string): string {
    const d = new Date(date);
    return d.toISOString().split('T')[0]; // yyyy-MM-dd
  }

  // -----------------------------
  // 2️⃣ LOAD AVAILABLE SLOTS FROM DB
  loadAvailableSlots(): void {
    if (!this.selectedDate || !this.doctor) return;

    const formattedDate = this.formatDate(this.selectedDate);

    const url = `${this.availableSlotsApiUrl}/${this.doctor.id}/${formattedDate}`;
    console.log('Calling API:', url);

    this.http.get<string[]>(url).subscribe({
      next: (slots) => {
        console.log('Slots received:', slots);
        this.availableSlots = slots ?? [];
        this.cdr.detectChanges(); // force UI update
      },
      error: (err) => {
        console.error('Slot load error', err);
        this.availableSlots = [];
        this.cdr.detectChanges();
      }
    });
  }

  // -----------------------------
  // 3️⃣ OPEN PAYMENT MODAL
  openPaymentModal(): void {
    if (!this.selectedDate || !this.selectedSlot) {
      alert('Select date and time slot');
      return;
    }
    this.showPaymentModal = true;
  }

  closePaymentModal(): void {
    this.showPaymentModal = false;
  }

  // -----------------------------
  // 4️⃣ CONFIRM BOOKING + PAYMENT
  confirmPayment(): void {
    if (!this.paymentMethod) {
      alert('Please select a payment method');
      return;
    }

    if (!this.selectedDate || !this.selectedSlot) {
      alert('Select date and time slot');
      return;
    }

    if (!this.mobile || !this.age || !this.gender) {
      alert('Please fill in all patient details (Mobile, Age, Gender)');
      return;
    }

    const appointmentDateTime = new Date(this.selectedDate);
    const isoDateTime = appointmentDateTime.toISOString(); // full datetime for SQL

    // ✅ PAYLOAD: must match backend model
    const payload = {
      appointmentId: 0,
      doctorId: this.doctor.id || this.doctor.Id,
      doctorName: this.doctor.fullName || this.doctor.FullName || this.doctor.name || this.doctor.Name,
      patientId: this.patientId,
      patientName: this.patientName,
      slotTime: this.selectedSlot,
      appointmentDate: this.selectedDate,
      sessionLink: '',
      status: 'Pending',
      fee: this.doctor.fee || this.doctor.Fee || 0,
      paidStatus: 'Pending',
      mobile: this.mobile,
      age: this.age,
      gender: this.gender,
      notes: this.notes
    };

    console.log('Booking payload:', payload);

    this.http.post<any>(
      `${this.apiUrl}/Book`,
      payload
    ).subscribe({
      next: (res) => {
        console.log('Appointment booked with ID:', res.appointmentId);

        // ✅ 2️⃣ CREATE PAYMENT RECORD
        const paymentPayload = {
          paymentId: 0,
          appointmentId: res.appointmentId,
          patientId: this.patientId,
          amount: this.doctor.fee || this.doctor.Fee || 0,
          status: 'Paid',
          paymentDate: new Date()
        };

        this.http.post('http://localhost:5120/api/Payments/Create', paymentPayload)
          .subscribe({
            next: () => {
              alert('Appointment booked & Payment Successful!');
              this.showPaymentModal = false;
              this.router.navigate(['/patient-dashboard']);
            },
            error: (err) => {
              console.error('Payment error:', err);
              // Even if payment rec fails, appointment is booked.
              alert('Appointment booked but Payment record failed.');
              this.showPaymentModal = false;
              this.router.navigate(['/patient-dashboard']);
            }
          });

      },
      error: (err) => {
        console.error('Booking error:', err);
        alert('Booking failed. Check console.');
      }
    });
  }

}
