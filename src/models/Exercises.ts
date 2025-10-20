export interface Answer {
  id: number;
  feedbackStatus: string;
  score: number;
  submissionDate: string;
}

export interface Exercise {
  id: number;
  title: string;
  difficultyLevel: string;
  maxPoints: number;
  exerciseType: string;
}

export interface ExerciseItem {
  exercise: Exercise;
  answer: Answer | null;
}
