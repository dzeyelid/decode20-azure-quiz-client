import { ResultInterface } from '@/interfaces/ResultInterface';

export default class Result implements ResultInterface {
  public questionId: string;

  public answerId: string;

  public isCorrect: boolean | null = null;

  constructor(questionId: string, answerId: string, isCorrect: boolean | null = null) {
    this.questionId = questionId;
    this.answerId = answerId;
    this.isCorrect = isCorrect;
  }
}
