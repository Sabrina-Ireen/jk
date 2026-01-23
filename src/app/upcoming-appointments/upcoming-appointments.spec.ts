import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpcomingAppointments } from './upcoming-appointments';

describe('UpcomingAppointments', () => {
  let component: UpcomingAppointments;
  let fixture: ComponentFixture<UpcomingAppointments>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UpcomingAppointments]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UpcomingAppointments);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
