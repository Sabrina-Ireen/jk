import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface DoctorSlotDto {
  PatientId: number;
  PatientName: string;
  SlotTime: string;       // e.g., "10:00 AM"
  SessionLink: string;
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
  private apiUrl = 'https://localhost:7051/api/Doctors';

  constructor(private http: HttpClient) {}

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
    `https://localhost:7051/api/Doctors/Profile/${doctorId}`
  );
}

updateDoctorProfile(doctorId: number, data: DoctorProfile) {
  return this.http.put(
    `https://localhost:7051/api/Doctors/Profile/${doctorId}`,
    data
  );
}
}
