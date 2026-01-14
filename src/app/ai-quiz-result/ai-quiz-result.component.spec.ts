import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AiQuizResult } from './ai-quiz-result.component';

describe('AiQuizResult', () => {
  let component: AiQuizResult;
  let fixture: ComponentFixture<AiQuizResult>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiQuizResult]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AiQuizResult);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
