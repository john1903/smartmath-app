export type ExerciseType =
  | "OPEN_ENDED"
  | "MULTIPLE_CHOICE"
  | "SINGLE_CHOICE"
  | "TRUE_FALSE"
  | "MATCHING";

// Base type
interface BaseAnswerPayload {
  exerciseType: ExerciseType;
  completionTime: string; // ISO 8601 duration like "PT2M30S"
}

export interface OpenEndedAnswerPayload extends BaseAnswerPayload {
  exerciseType: "OPEN_ENDED";
  answerFileIds: string[];
}

export interface MultipleChoiceAnswerPayload extends BaseAnswerPayload {
  exerciseType: "MULTIPLE_CHOICE";
  answer: string[]; // e.g. ["A", "C"]
}

export interface SingleChoiceAnswerPayload extends BaseAnswerPayload {
  exerciseType: "SINGLE_CHOICE";
  answer: string; // e.g. "B"
}

export interface TrueFalseAnswerPayload extends BaseAnswerPayload {
  exerciseType: "TRUE_FALSE";
  answer: Record<string, boolean>; // e.g. { "1": true, "2": false }
}

// For matching exercises
export interface MatchingAnswerPayload extends BaseAnswerPayload {
  exerciseType: "MATCHING";
  answer: Record<string, number>; // e.g. { "A": 1 }
}
export interface SubmitExerciseAnswerPayload {
  exerciseType: ExerciseType;
  completionTime: string;
  answer?: string | string[] | Record<string, any>;
  answerFileIds?: string[];
}

export interface SubmitExerciseAnswerResponse {
  id: number;
  feedbackStatus: "CORRECT" | "INCORRECT" | "PARTIAL" | string;
  score: number;
  submissionDate: string;
  answerType: string;
  answer: string | Record<string, any>;
  solution: string | Record<string, any>;
}
