import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAppointments } from './admin-appointments.component';

describe('AdminAppointments', () => {
  let component: AdminAppointments;
  let fixture: ComponentFixture<AdminAppointments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminAppointments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminAppointments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
