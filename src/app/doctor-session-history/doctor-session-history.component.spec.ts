import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorSessionHistoryComponent } from './doctor-session-history.component';

describe('DoctorSessionHistoryComponent', () => {
  let component: DoctorSessionHistoryComponent;
  let fixture: ComponentFixture<DoctorSessionHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DoctorSessionHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DoctorSessionHistoryComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
