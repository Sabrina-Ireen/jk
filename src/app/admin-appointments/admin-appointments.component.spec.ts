import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAppointmentsComponent } from './admin-appointments.component';

describe('AdminAppointments', () => {
  let component: AdminAppointmentsComponent;
  let fixture: ComponentFixture<AdminAppointmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAppointmentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAppointmentsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
