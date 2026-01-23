import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface QuizOption {
  text: string;
  scores: { [specialization: string]: number }; // specialization names
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
      question: "Do you often feel sad, hopeless, or lose interest in activities?",
      options: [
        { text: "Never", scores: {} },
        { text: "Sometimes", scores: { "Depression": 1 } },
        { text: "Often", scores: { "Depression": 2 } },
        { text: "Always", scores: { "Depression": 3 } }
      ]
    },
    {
      question: "Do you frequently feel anxious, stressed, or panicky?",
      options: [
        { text: "Never", scores: {} },
        { text: "Sometimes", scores: { "Anxiety & Stress": 1 } },
        { text: "Often", scores: { "Anxiety & Stress": 2 } },
        { text: "Always", scores: { "Anxiety & Stress": 3 } }
      ]
    },
    {
      question: "Do you experience obsessive thoughts or compulsive behaviors?",
      options: [
        { text: "No", scores: {} },
        { text: "Mild", scores: { "General Adult": 1 } },
        { text: "Moderate", scores: { "General Adult": 2 } },
        { text: "Severe", scores: { "General Adult": 3 } }
      ]
    },
    {
      question: "Do you face conflicts or stress in family or romantic relationships?",
      options: [
        { text: "No", scores: {} },
        { text: "Mild", scores: { "Couples Therapy": 1 } },
        { text: "Moderate", scores: { "Couples Therapy": 2 } },
        { text: "Severe", scores: { "Couples Therapy": 3 } }
      ]
    },
    {
      question: "Do you have a history of alcohol or substance use?",
      options: [
        { text: "None", scores: {} },
        { text: "Occasionally", scores: { "Addiction": 1 } },
        { text: "Often", scores: { "Addiction": 2 } },
        { text: "Very frequently", scores: { "Addiction": 3 } }
      ]
    },
    {
      question: "Are you experiencing memory issues, concentration problems, or neurological symptoms?",
      options: [
        { text: "No", scores: {} },
        { text: "Mild", scores: { "Neuropsychiatry": 1 } },
        { text: "Moderate", scores: { "Neuropsychiatry": 2 } },
        { text: "Severe", scores: { "Neuropsychiatry": 3 } }
      ]
    },
    {
      question: "Do you have physical symptoms like fatigue or pain without clear medical reason?",
      options: [
        { text: "No", scores: {} },
        { text: "Mild", scores: { "Psychosomatic": 1 } },
        { text: "Moderate", scores: { "Psychosomatic": 2 } },
        { text: "Severe", scores: { "Psychosomatic": 3 } }
      ]
    },
    {
      question: "Are you under 18 years old or facing childhood/adolescent behavioral challenges?",
      options: [
        { text: "No", scores: {} },
        { text: "Yes", scores: { "Child & Adolescent": 3 } }
      ]
    },
    {
      question: "Do you have thoughts of self-harm or suicide?",
      options: [
        { text: "No", scores: {} },
        { text: "Sometimes", scores: { "Depression": 2 } },
        { text: "Often", scores: { "Depression": 3 } },
        { text: "Always", scores: { "Depression": 3 } }
      ]
    },
    {
      question: "Do you feel socially isolated or have difficulty connecting with others?",
      options: [
        { text: "No", scores: {} },
        { text: "Sometimes", scores: { "Child & Adolescent": 1, "General Adult": 1 } },
        { text: "Often", scores: { "Child & Adolescent": 2, "General Adult": 2 } },
        { text: "Always", scores: { "Child & Adolescent": 3, "General Adult": 3 } }
      ]
    }
  ];

  constructor(private router: Router) { }

  onOptionSelect() {
    this.next();
  }

  next() {
    if (!this.questions[this.currentStep].answerText) return;
    if (this.currentStep < this.questions.length - 1) {
      this.currentStep++;
    } else {
      this.submitQuiz();
    }
  }

  previous() {
    if (this.currentStep > 0) this.currentStep--;
  }

  getSelectedOption(q: QuizQuestion) {
    return q.options.find(opt => opt.text === q.answerText);
  }

  submitQuiz() {
    // ✅ 1. Initialize all specializations to 0
    const allSpecializations = [
      "Depression", "Anxiety & Stress", "General Adult",
      "Couples Therapy", "Addiction", "Neuropsychiatry",
      "Psychosomatic", "Child & Adolescent"
    ];

    const scores: { [name: string]: number } = {};
    allSpecializations.forEach(s => scores[s] = 0);

    // 2. Sum points
    this.questions.forEach(q => {
      const selected = this.getSelectedOption(q);
      if (selected) {
        for (const name in selected.scores) {
          scores[name] += selected.scores[name];
        }
      }
    });

    // 3. Determine recommended specialization
    let recommendedSpecialization = "General Adult"; // Default fallback

    // Calculate max score
    let maxScore = 0;
    let winner = "General Adult";

    allSpecializations.forEach(spec => {
      if (scores[spec] > maxScore) {
        maxScore = scores[spec];
        winner = spec;
      }
    });

    // Priority / Overrides
    if (scores["Addiction"] >= 3) {
      recommendedSpecialization = "Addiction";
    } else if (scores["Depression"] >= 3 && this.questions[8].answerText && this.questions[8].answerText !== "No") {
      recommendedSpecialization = "Depression";
    } else if (maxScore > 0) {
      recommendedSpecialization = winner;
    }

    // 4. Navigate to result page
    this.router.navigate(['/ai-quiz-result'], { state: { specialization: recommendedSpecialization } });
  }
}
