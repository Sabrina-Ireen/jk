import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AiQuizComponent } from './ai-quiz.component';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

describe('AiQuizComponent', () => {
  let component: AiQuizComponent;
  let fixture: ComponentFixture<AiQuizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AiQuizComponent, FormsModule, RouterTestingModule]
    }).compileComponents();

    fixture = TestBed.createComponent(AiQuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
