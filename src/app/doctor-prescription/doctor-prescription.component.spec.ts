import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorPrescriptionComponent } from './doctor-prescription.component';

describe('DoctorPrescription', () => {
  let component: DoctorPrescriptionComponent;
  let fixture: ComponentFixture<DoctorPrescriptionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorPrescriptionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorPrescriptionComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
