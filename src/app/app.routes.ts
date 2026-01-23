import { Routes } from '@angular/router';
import { DoctorGuard } from './doctor.guard';
import { PatientGuard } from './patient.guard';
import { AdminGuard } from './admin.guard';

export const routes: Routes = [
  // Home page
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', loadComponent: () => import('./home/home.component').then(m => m.HomeComponent) },

  // Auth pages
  { path: 'login', loadComponent: () => import('./login/login.component').then(m => m.LoginComponent) },
  { path: 'register', loadComponent: () => import('./register/register.component').then(m => m.RegisterComponent) },

  // Patient Dashboard
  { path: 'patient-dashboard', loadComponent: () => import('./patient-dashboard/patient-dashboard.component').then(m => m.PatientDashboardComponent), canActivate: [PatientGuard] },
  // Patient All Doctors + Book Appointment
  {
    path: 'patient-doctors',
    loadComponent: () => import('./patient-doctors/patient-doctors.component').then(m => m.PatientDoctorsComponent),
    canActivate: [PatientGuard]
  },
  {
    path: 'book-appointment',
    loadComponent: () => import('./book-appointment/book-appointment.component').then(m => m.BookAppointmentComponent),
    canActivate: [PatientGuard]
  },
  {
    path: 'ai-quiz',
    loadComponent: () =>
      import('./ai-quiz/ai-quiz.component')
        .then(m => m.AiQuizComponent),
    canActivate: [PatientGuard]
  },
  {
    path: 'ai-quiz-result',
    loadComponent: () =>
      import('./ai-quiz-result/ai-quiz-result.component')
        .then(m => m.AiQuizResultComponent),
    canActivate: [PatientGuard]
  },
  {
    path: 'upcoming-appointments',
    loadComponent: () => import('./upcoming-appointments/upcoming-appointments.component').then(m => m.UpcomingAppointmentsComponent),
    canActivate: [PatientGuard]
  },
  {
    path: 'patient-prescriptions',
    loadComponent: () => import('./patient-prescriptions/patient-prescriptions.component').then(m => m.PatientPrescriptionsComponent),
    canActivate: [PatientGuard]
  },

  // Doctor Dashboard
  {
    path: 'doctor-dashboard',
    loadComponent: () => import('./doctor-dashboard/doctor-dashboard.component').then(m => m.DoctorDashboardComponent),
    canActivate: [DoctorGuard]
  },
  {
    path: 'doctor/add-prescription',
    loadComponent: () => import('./doctor-prescription/doctor-prescription.component')
      .then(m => m.DoctorPrescriptionComponent),
    canActivate: [DoctorGuard]
  },
  {
    path: 'doctor/session-history',
    loadComponent: () => import('./doctor-session-history/doctor-session-history.component').then(m => m.DoctorSessionHistoryComponent),
    canActivate: [DoctorGuard]
  },
  {
    path: 'doctor/edit-profile',
    loadComponent: () =>
      import('./doctor-edit-profile/doctor-edit-profile.component')
        .then(m => m.DoctorEditProfileComponent)
  },

  // Admin Section (layout + child routes)
  {
    path: 'admin',
    loadComponent: () => import('./admin/admin.component').then(m => m.AdminComponent),
    canActivate: [AdminGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', loadComponent: () => import('./admin-dashboard/admin-dashboard.component').then(m => m.AdminDashboardComponent) },
      { path: 'patients', loadComponent: () => import('./admin-patients/admin-patients.component').then(m => m.AdminPatientsComponent) },
      { path: 'doctors', loadComponent: () => import('./admin-doctors/admin-doctors.component').then(m => m.AdminDoctorsComponent) },

      {
        path: 'appointments',
        loadComponent: () => import('./admin-appointments/admin-appointments.component')
          .then(m => m.AdminAppointmentsComponent)
      },
      {
        path: 'schedules',
        loadComponent: () => import('./admin-schedules/admin-schedules.component')
          .then(m => m.AdminSchedulesComponent)
      },
      {
        path: 'specializations',
        loadComponent: () =>
          import('./admin-specialization/admin-specialization.component')
            .then(m => m.AdminSpecializationComponent)
      },

      {
        path: 'reports',
        loadComponent: () =>
          import('./admin-reports/admin-reports.component')
            .then(m => m.AdminReportsComponent)
      }


    ]

  }


];
