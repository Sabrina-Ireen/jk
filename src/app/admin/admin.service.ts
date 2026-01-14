import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
export interface Specialization {
  id: number;
  name: string;
}
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private apiUrl = 'https://localhost:7051/api/Admin';
  private specializationUrl = 'https://localhost:7051/api/Specializations';

  constructor(private http: HttpClient) {}

  // --------------------
  // COUNTS
  // --------------------
  getCounts(): Observable<any> {
    return this.http.get(`${this.apiUrl}/Counts`);
  }

  // --------------------
  // APPOINTMENTS
  // --------------------
  getAppointments(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Appointments`);
  }

  addAppointment(appointment: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Appointments`, appointment);
  }

  updateAppointment(id: number, appointment: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Appointments/${id}`, appointment);
  }

  deleteAppointment(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Appointments/${id}`);
  }

  // --------------------
  // DOCTORS
  // --------------------
  getDoctors(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Doctors`);
  }

  addDoctor(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Doctors`, data);
  }

  updateDoctor(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Doctors/${id}`, data);
  }

  deleteDoctor(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Doctors/${id}`);
  }

  // --------------------
  // PATIENTS
  // --------------------
  getPatients(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Patients`);
  }

  addPatient(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Patients`, data);
  }

  updatePatient(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Patients/${id}`, data);
  }

  deletePatient(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Patients/${id}`);
  }

  // --------------------
  // SCHEDULES
  // --------------------
  getSchedules(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/Schedules`);
  }

  addSchedule(data: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/Schedules`, data);
  }

  updateSchedule(id: number, data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/Schedules/${id}`, data);
  }

  deleteSchedule(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/Schedules/${id}`);
  }

  // --------------------
  // SPECIALIZATIONS ✅
  // --------------------
  getSpecializations(): Observable<Specialization[]> {
    return this.http.get<Specialization[]>(this.specializationUrl);
  }

  addSpecialization(spec: { name: string }): Observable<any> {
    return this.http.post(this.specializationUrl, spec);
  }

  updateSpecialization(id: number, spec: { name: string }): Observable<any> {
    return this.http.put(`${this.specializationUrl}/${id}`, spec);
  }

  deleteSpecialization(id: number): Observable<any> {
    return this.http.delete(`${this.specializationUrl}/${id}`);
  }

  // --------------------
  // REPORTS
  // --------------------
  getReports(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/Reports`);
  }
}
