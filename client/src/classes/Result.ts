import { ResultInterface } from '@/interfaces/ResultInterface';
import { Question } from '../interfaces/Question';

export default class Result implements ResultInterface {
  public question: Question;

  public answerId: string;

  public isCorrect: boolean | null = null;

  constructor(question: Question, answerId: string) {
    this.question = question;
    this.answerId = answerId;
  }

  public setIsCorrect(isCorrect: boolean | null) {
    this.isCorrect = isCorrect;
  }
}
