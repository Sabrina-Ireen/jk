import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDoctorsComponent } from './admin-doctors.component';

describe('AdminDoctors', () => {
  let component: AdminDoctorsComponent;
  let fixture: ComponentFixture<AdminDoctorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDoctorsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDoctorsComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
