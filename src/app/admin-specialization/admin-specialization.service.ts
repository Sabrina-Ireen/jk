import { Injectable } from '@angular/core';           // for @Injectable
import { HttpClient } from '@angular/common/http';    // for HttpClient
import { Observable } from 'rxjs';                   // for Observable

// Define your interface (or import it if it's in another file)
export interface Specialization {
  id: number;
  name: string;
}

@Injectable({
  providedIn: 'root'
})
export class AdminSpecializationService {

  private apiUrl = 'http://localhost:5120/api/Specializations';

  constructor(private http: HttpClient) { }

  getAll(): Observable<Specialization[]> {
    return this.http.get<Specialization[]>(this.apiUrl);
  }

  add(spec: { name: string }): Observable<Specialization> {
    return this.http.post<Specialization>(this.apiUrl, spec);
  }

  update(id: number, spec: { name: string }): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, spec);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
