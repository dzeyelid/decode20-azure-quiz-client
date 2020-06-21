import { Question } from '../interfaces/Question';

export default class Result {
  private _question: Question;
  private _answerId: string;
  private _isCorrect: boolean | null = null;

  constructor(question: Question, answerId: string) {
    this._question = question;
    this._answerId = answerId;
  }

  public set isCorrect(isCorrect: boolean) {
    this._isCorrect = isCorrect;
  }
}