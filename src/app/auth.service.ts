import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private api = 'http://localhost:5120/api/Auth';

  constructor(private http: HttpClient) { }

  register(data: any) { return this.http.post(`${this.api}/register`, data); }
  login(data: any) { return this.http.post(`${this.api}/login`, data); }

  getUser() { return JSON.parse(localStorage.getItem('user') || '{}'); }
  logout() { localStorage.removeItem('user'); }
}
