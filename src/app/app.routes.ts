import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent) },
  { path: 'patient-dashboard', loadComponent: () => import('./patient-dashboard/patient-dashboard.component').then(m => m.PatientDashboardComponent) },
  { path: 'ai-quiz', loadComponent: () => import('./ai-quiz/ai-quiz.component').then(m => m.AiQuizComponent) },
  
];
