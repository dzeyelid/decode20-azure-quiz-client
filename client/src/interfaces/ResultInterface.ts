import { Question } from './Question';

export interface ResultInterface {
  question: Question
  answerId: string
  isCorrect: boolean | null
}