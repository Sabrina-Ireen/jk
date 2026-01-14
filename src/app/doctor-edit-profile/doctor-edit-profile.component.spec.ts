import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorEditProfile } from './doctor-edit-profile.component';

describe('DoctorEditProfile', () => {
  let component: DoctorEditProfile;
  let fixture: ComponentFixture<DoctorEditProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorEditProfile]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorEditProfile);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
