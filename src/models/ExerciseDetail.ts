// src/models/exercise.ts

// Core Exercise Types
export type ExerciseType =
  | "MULTIPLE_CHOICE"
  | "TRUE_FALSE"
  | "SINGLE_CHOICE"
  | "OPEN_ENDED"
  | "MATCHING";

export interface Illustration {
  uri: string;
}

// Exercise Base Interface
export interface ExerciseBase {
  id: number;
  title: string;
  description: string;
  difficultyLevel: "EASY" | "MEDIUM" | "HARD";
  maxPoints: number;
  exerciseType: ExerciseType;
  illustrations?: Illustration[] | null;
}

// Variants by Type
export interface OpenEndedExercise extends ExerciseBase {
  exerciseType: "OPEN_ENDED";
}

export interface MultipleChoiceExercise extends ExerciseBase {
  exerciseType: "MULTIPLE_CHOICE";
  options: Record<string, string>; // A, B, C, D
}

export interface SingleChoiceExercise extends ExerciseBase {
  exerciseType: "SINGLE_CHOICE";
  options: Record<string, string>;
}

export interface TrueFalseExercise extends ExerciseBase {
  exerciseType: "TRUE_FALSE";
  statements: Record<string, string>;
}

export interface MatchingExercise extends ExerciseBase {
  exerciseType: "MATCHING";
  optionsRowFirst: Record<string, string>;
  optionsRowSecond: Record<string, string>;
}

// Union Type for all exercises
export type Exercise =
  | OpenEndedExercise
  | MultipleChoiceExercise
  | SingleChoiceExercise
  | TrueFalseExercise
  | MatchingExercise;

// API Response
export interface ExerciseResponse {
  exercise: Exercise;
  answer?: {
    feedbackStatus?: string;
    answerText?: string;
    [key: string]: any;
  } | null;
  recommendation?: any;
}
