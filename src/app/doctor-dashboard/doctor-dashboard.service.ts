import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DoctorSlotDto {
  patientId: number;
  patientName: string;
  appointmentDate: string;
  slotDate: string; // New definitive property
  slotTime: string;
  sessionLink: string;
}
export interface DoctorSessionDto {
  appointmentId: number;
  patientName: string;
  appointmentDate: string;
  slotTime: string;
  diagnosis: string | null;
  notes: string | null;
  medicines: string | null;
  sessionLink: string;
}
export interface DoctorProfile {
  id: number;
  fullName: string;
  email: string;
  specialization: string;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class DoctorDashboardService {
  private apiUrl = 'http://localhost:5120/api/Doctors';

  constructor(private http: HttpClient) { }

  // Fetch today's slots for a doctor
  getTodaySlots(doctorId: number): Observable<DoctorSlotDto[]> {
    return this.http.get<DoctorSlotDto[]>(`${this.apiUrl}/Dashboard/${doctorId}`);
  }
  getDoctorSessions(doctorId: number): Observable<DoctorSessionDto[]> {
    return this.http.get<DoctorSessionDto[]>(
      `${this.apiUrl}/Sessions/${doctorId}`
    );
  }
  getDoctorProfile(doctorId: number) {
    return this.http.get<DoctorProfile>(
      `${this.apiUrl}/Profile/${doctorId}`
    );
  }

  updateDoctorProfile(doctorId: number, data: DoctorProfile) {
    return this.http.put(
      `${this.apiUrl}/Profile/${doctorId}`,
      data
    );
  }
  getDoctorPatients(doctorId: number) {
    return this.http.get<{ patientId: number; patientName: string }[]>(
      `${this.apiUrl}/Patients/${doctorId}`
    );
  }
  getDoctorPatientsToday(doctorId: number) {
    return this.http.get<{ patientId: number; patientName: string }[]>(
      `${this.apiUrl}/Patients/Today/${doctorId}`
    );
  }
  getDoctorPatientsUpcoming(doctorId: number) {
    return this.http.get<{ patientId: number; patientName: string }[]>(
      `${this.apiUrl}/UpcomingPatients/${doctorId}`
    );
  }

  savePrescription(payload: any) {
    return this.http.post('http://localhost:5120/api/Prescriptions', payload);
  }
}
