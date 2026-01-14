import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSpecialization } from './admin-specialization.component';

describe('AdminSpecialization', () => {
  let component: AdminSpecialization;
  let fixture: ComponentFixture<AdminSpecialization>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSpecialization]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSpecialization);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
