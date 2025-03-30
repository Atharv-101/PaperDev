export type Difficulty = 'easy' | 'medium' | 'hard';

export interface QuestionInput {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  original: string;
  variations: string[];
  difficulty: Difficulty;
  selectedVariations: number[];
}

export interface GeneratorState {
  questions: Question[];
  loading: boolean;
  error: string | null;
}