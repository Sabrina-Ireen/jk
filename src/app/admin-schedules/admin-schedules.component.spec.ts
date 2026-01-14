import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSchedulesComponent } from './admin-schedules.component';

describe('AdminSchedulesComponent', () => {
  let component: AdminSchedulesComponent;
  let fixture: ComponentFixture<AdminSchedulesComponent>;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminSchedulesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminSchedulesComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
