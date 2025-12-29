import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface QuizOption {
  text: string;
  scores: { [category: string]: number };
}

interface QuizQuestion {
  question: string;
  options: QuizOption[];
  answerText?: string;
}

@Component({
  selector: 'app-ai-quiz',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ai-quiz.component.html'
})
export class AiQuizComponent {
  currentStep = 0;

  questions: QuizQuestion[] = [
    {
      question: "What is your age group?",
      options: [
        { text: "Under 18", scores: { "Child & Adolescent": 3 } },
        { text: "18–59", scores: { "General Adult": 3 } },
        { text: "60+", scores: { "Geriatric": 3 } }
      ]
    },
    {
      question: "How often do you feel anxious?",
      options: [
        { text: "Never", scores: {} },
        { text: "Sometimes", scores: { "General Adult": 1, "Child & Adolescent": 1 } },
        { text: "Often", scores: { "General Adult": 2, "Child & Adolescent": 2 } },
        { text: "Always", scores: { "General Adult": 3, "Child & Adolescent": 3 } }
      ]
    },
    {
      question: "Do you have trouble sleeping?",
      options: [
        { text: "Never", scores: {} },
        { text: "Sometimes", scores: { "Sleep": 1 } },
        { text: "Often", scores: { "Sleep": 2 } },
        { text: "Always", scores: { "Sleep": 3 } }
      ]
    },
    {
      question: "Do you feel sad or depressed frequently?",
      options: [
        { text: "Never", scores: {} },
        { text: "Mild", scores: { "General Adult": 1, "Geriatric": 1 } },
        { text: "Moderate", scores: { "General Adult": 2, "Geriatric": 2 } },
        { text: "Severe", scores: { "General Adult": 3, "Geriatric": 3 } }
      ]
    },
    {
      question: "Do you have trouble concentrating?",
      options: [
        { text: "Never", scores: {} },
        { text: "Sometimes", scores: { "General Adult": 1, "Child & Adolescent": 1 } },
        { text: "Often", scores: { "General Adult": 2, "Child & Adolescent": 2 } },
        { text: "Always", scores: { "General Adult": 3, "Child & Adolescent": 3 } }
      ]
    },
    {
      question: "Do you experience panic attacks?",
      options: [
        { text: "Never", scores: {} },
        { text: "Rarely", scores: { "General Adult": 1 } },
        { text: "Sometimes", scores: { "General Adult": 2 } },
        { text: "Often", scores: { "General Adult": 3 } }
      ]
    },
    {
      question: "Do you have a history of substance use?",
      options: [
        { text: "None", scores: {} },
        { text: "Occasionally", scores: { "Addiction": 1 } },
        { text: "Often", scores: { "Addiction": 2 } },
        { text: "Very frequently", scores: { "Addiction": 3 } }
      ]
    },
    {
      question: "Do you have family or relationship conflicts?",
      options: [
        { text: "No", scores: {} },
        { text: "Mild", scores: { "Marriage & Family": 1 } },
        { text: "Moderate", scores: { "Marriage & Family": 2 } },
        { text: "Severe", scores: { "Marriage & Family": 3 } }
      ]
    },
    {
      question: "Do you experience memory or cognitive problems?",
      options: [
        { text: "None", scores: {} },
        { text: "Mild", scores: { "General Adult": 1 } },
        { text: "Moderate", scores: { "Neuropsychiatry": 2 } },
        { text: "Severe", scores: { "Neuropsychiatry": 3, "Geriatric": 1 } }
      ]
    },
    {
      question: "Do you have chronic physical illness?",
      options: [
        { text: "No", scores: {} },
        { text: "Minor", scores: { "Psychosomatic": 1 } },
        { text: "Chronic", scores: { "Psychosomatic": 2 } },
        { text: "Severe", scores: { "Psychosomatic": 3, "Geriatric": 1 } }
      ]
    },
    {
      question: "Do you have obsessive or compulsive behaviors?",
      options: [
        { text: "No", scores: {} },
        { text: "Mild", scores: { "General Adult": 1 } },
        { text: "Moderate", scores: { "General Adult": 2 } },
        { text: "Severe", scores: { "General Adult": 3 } }
      ]
    },
    {
      question: "Do you experience social withdrawal?",
      options: [
        { text: "Never", scores: {} },
        { text: "Sometimes", scores: { "General Adult": 1, "Child & Adolescent": 1 } },
        { text: "Often", scores: { "General Adult": 2, "Child & Adolescent": 2 } },
        { text: "Always", scores: { "General Adult": 3, "Child & Adolescent": 3 } }
      ]
    },
    {
      question: "Do you have appetite changes?",
      options: [
        { text: "No", scores: {} },
        { text: "Mild", scores: { "General Adult": 1, "Child & Adolescent": 1 } },
        { text: "Moderate", scores: { "General Adult": 2, "Geriatric": 2 } },
        { text: "Severe", scores: { "General Adult": 3, "Geriatric": 3, "Psychosomatic": 2 } }
      ]
    },
    {
      question: "Do you have hyperactivity or impulsivity?",
      options: [
        { text: "None", scores: {} },
        { text: "Mild", scores: { "Child & Adolescent": 1 } },
        { text: "Moderate", scores: { "Child & Adolescent": 2 } },
        { text: "Severe", scores: { "Child & Adolescent": 3 } }
      ]
    },
    {
      question: "Do you have family psychiatric history?",
      options: [
        { text: "None", scores: {} },
        { text: "Mild", scores: { "General Adult": 1, "Child & Adolescent": 1 } },
        { text: "Moderate", scores: { "General Adult": 2, "Child & Adolescent": 2 } },
        { text: "Severe", scores: { "General Adult": 3, "Child & Adolescent": 3, "Geriatric": 1 } }
      ]
    }
  ];

  constructor(private router: Router) {}

  next() {
    if (this.currentStep < this.questions.length - 1) {
      this.currentStep++;
    } else {
      this.submitQuiz();
    }
  }

  previous() {
    if (this.currentStep > 0) {
      this.currentStep--;
    }
  }

  getSelectedOption(q: QuizQuestion): QuizOption | undefined {
    return q.options.find(opt => opt.text === q.answerText);
  }

  submitQuiz() {
    const categoryScores: { [key: string]: number } = {};

    this.questions.forEach(q => {
      const selected = this.getSelectedOption(q);
      if (selected) {
        for (let category in selected.scores) {
          categoryScores[category] = (categoryScores[category] || 0) + selected.scores[category];
        }
      }
    });

    const recommendedCategory = Object.keys(categoryScores).reduce((a, b) =>
      categoryScores[a] > categoryScores[b] ? a : b
    );

    console.log("Category Scores:", categoryScores);
    console.log("Recommended Psychiatrist:", recommendedCategory);

    this.router.navigate(['/doctor-recommendation'], { state: { category: recommendedCategory } });
  }
}
