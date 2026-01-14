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
  // 1️⃣ Age Question
  {
    question: "What is your age group?",
    options: [
      { text: "Under 18", scores: { "Child & Adolescent": 3 } },
      { text: "18–59", scores: { "General Adult": 3 } },
      { text: "60+", scores: { "Geriatric": 3 } }
    ]
  },

  // 2️⃣ Depression
  {
    question: "Do you often feel sad or depressed?",
    options: [
      { text: "Never", scores: {} },
      { text: "Sometimes", scores: { "Depression": 1 } },
      { text: "Often", scores: { "Depression": 2 } },
      { text: "Always", scores: { "Depression": 3 } }
    ]
  },

  //3️⃣ Anxiety & Stress
  {
    question: "Do you feel anxious or stressed frequently?",
    options: [
      { text: "Never", scores: {} },
      { text: "Sometimes", scores: { "Anxiety & Stress": 1 } },
      { text: "Often", scores: { "Anxiety & Stress": 2 } },
      { text: "Always", scores: { "Anxiety & Stress": 3 } }
    ]
  },

  {
    question: "Do you experience panic attacks?",
    options: [
      { text: "Never", scores: {} },
      { text: "Rarely", scores: { "Anxiety & Stress": 1 } },
      { text: "Sometimes", scores: { "Anxiety & Stress": 2 } },
      { text: "Often", scores: { "Anxiety & Stress": 3 } }
    ]
  },

  // 4️⃣ Suicide
  {
    question: "Do you have thoughts of self-harm or suicide?",
    options: [
      { text: "Never", scores: {} },
      { text: "Sometimes", scores: { "Depression": 2 } },
      { text: "Often", scores: { "Depression": 3, "General Adult": 1 } },
      { text: "Always", scores: { "Depression": 3 } }
    ]
  },

  // 5️⃣ Sleep
  {
    question: "Do you have trouble sleeping?",
    options: [
      { text: "Never", scores: {} },
      { text: "Sometimes", scores: { "Sleep": 1 } },
      { text: "Often", scores: { "Sleep": 2 } },
      { text: "Always", scores: { "Sleep": 3 } }
    ]
  },

  // 6️⃣ Family / Relationship
  {
    question: "Do you have family or relationship conflicts?",
    options: [
      { text: "No", scores: {} },
      { text: "Mild", scores: { "Couples Therapy": 1 } },
      { text: "Moderate", scores: { "Couples Therapy": 2 } },
      { text: "Severe", scores: { "Couples Therapy": 3 } }
    ]
  },

  // 7️⃣ Addiction
  {
    question: "Do you have a history of substance use?",
    options: [
      { text: "None", scores: {} },
      { text: "Occasionally", scores: { "Addiction": 1 } },
      { text: "Often", scores: { "Addiction": 2 } },
      { text: "Very frequently", scores: { "Addiction": 3 } }
    ]
  },

  // 8️⃣ Cognitive / Memory
  {
    question: "Do you experience memory or cognitive problems?",
    options: [
      { text: "None", scores: {} },
      { text: "Mild", scores: { "Neuropsychiatry": 1 } },
      { text: "Moderate", scores: { "Neuropsychiatry": 2 } },
      { text: "Severe", scores: { "Neuropsychiatry": 3 } }
    ]
  },

  // 9️⃣ Obsessive / Compulsive
  {
    question: "Do you have obsessive or compulsive behaviors?",
    options: [
      { text: "No", scores: {} },
      { text: "Mild", scores: { "General Adult": 1 } },
      { text: "Moderate", scores: { "General Adult": 2 } },
      { text: "Severe", scores: { "General Adult": 3 } }
    ]
  },

  // 10️⃣ Social Withdrawal
  {
    question: "Do you experience social withdrawal?",
    options: [
      { text: "Never", scores: {} },
      { text: "Sometimes", scores: { "Child & Adolescent": 1 } },
      { text: "Often", scores: { "Child & Adolescent": 2 } },
      { text: "Always", scores: { "Child & Adolescent": 3 } }
    ]
  },

  // 11️⃣ Appetite
  {
    question: "Do you have appetite changes?",
    options: [
      { text: "No", scores: {} },
      { text: "Mild", scores: { "Psychosomatic": 1 } },
      { text: "Moderate", scores: { "Psychosomatic": 2 } },
      { text: "Severe", scores: { "Psychosomatic": 3 } }
    ]
  },

  // 12️⃣ Hyperactivity
  {
    question: "Do you have hyperactivity or impulsivity?",
    options: [
      { text: "None", scores: {} },
      { text: "Mild", scores: { "Child & Adolescent": 1 } },
      { text: "Moderate", scores: { "Child & Adolescent": 2 } },
      { text: "Severe", scores: { "Child & Adolescent": 3 } }
    ]
  },

  // 13️⃣ Chronic Physical Illness
  {
    question: "Do you have chronic physical illness?",
    options: [
      { text: "No", scores: {} },
      { text: "Minor", scores: { "Psychosomatic": 1 } },
      { text: "Chronic", scores: { "Psychosomatic": 2 } },
      { text: "Severe", scores: { "Psychosomatic": 3 } }
    ]
  },

  // 14️⃣ Family Psychiatric History
  {
    question: "Do you have family psychiatric history?",
    options: [
      { text: "None", scores: {} },
      { text: "Mild", scores: { "General Adult": 1, "Child & Adolescent": 1 } },
      { text: "Moderate", scores: { "General Adult": 2, "Child & Adolescent": 2 } },
      { text: "Severe", scores: { "General Adult": 3, "Child & Adolescent": 3 } }
    ]
  },

  // 15️⃣ Anxiety Triggers
  {
    question: "Do you experience anxiety before exams, work, or presentations?",
    options: [
      { text: "Never", scores: {} },
      { text: "Sometimes", scores: { "Anxiety & Stress": 1 } },
      { text: "Often", scores: { "Anxiety & Stress": 2 } },
      { text: "Always", scores: { "Anxiety & Stress": 3 } }
    ]
  }
];


  constructor(private router: Router) {}

  next() {
    const currentQuestion = this.questions[this.currentStep];
    if (!currentQuestion.answerText) {
      alert("Please select an answer before continuing.");
      return;
    }
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
    debugger;
    return q.options.find(opt => opt.text === q.answerText);
  }

  submitQuiz() {
    debugger;
    const categoryScores: { [key: string]: number } = {};
    this.questions.forEach(q => {
      const selected = this.getSelectedOption(q);
      if (selected) {
        for (let category in selected.scores) {
          categoryScores[category] = (categoryScores[category] || 0) + selected.scores[category];
        }
      }
    });

    // Find highest scoring specialization
    const recommendedCategory = Object.keys(categoryScores).reduce((a, b) =>
      categoryScores[a] > categoryScores[b] ? a : b
    );

    console.log("Scores:", categoryScores);
    console.log("Recommended:", recommendedCategory);

    // Navigate to recommendation page
    this.router.navigate(['/doctor-recommendation'], { state: { category: recommendedCategory } });
  }
}
