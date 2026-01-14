import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-ai-quiz-result',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ai-quiz-result.component.html'
})
export class AiQuizResultComponent {

  category: string | null = null;

  constructor(private router: Router) {
    const nav = this.router.getCurrentNavigation();
    this.category = nav?.extras?.state?.['category'] || null;
  }

  goToDoctors() {
    this.router.navigate(['/patient-dashboard']);
  }
}
