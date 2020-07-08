import { Result } from '@/interfaces/Result';
import moment from 'moment';

export default class ResultRepository {
  private results: Result[] = [];

  constructor() {
    this.load();
  }

  private load(): void {
    if (!localStorage.results) {
      localStorage.results = JSON.stringify([]);
    } else {
      this.resetPastResults();
    }

    this.results = JSON.parse(localStorage.results);
  }

  public getAll(): Result[] {
    return this.results;
  }

  public update(result: Result) {
    const index = this.findFromResults(result.questionId);
    if (index < 0) {
      this.results.push(result);
    } else {
      this.results[index] = result;
    }

    this.updateLocalStorage();
  }

  public updateWithCorrectAnswer(questionId: string, correctAnswerId: string) {
    const index = this.findFromResults(questionId);
    if (index >= 0) {
      const { answerId } = this.results[index];
      this.results[index].isCorrect = answerId.toLowerCase() === correctAnswerId.toLowerCase();
      this.updateLocalStorage();
    }
  }

  public reset() {
    this.results = [];
    this.updateLocalStorage();
  }

  public isFirstResult() {
    return this.results.length === 0;
  }

  private resetPastResults() {
    if (localStorage.lastUpdated) {
      const lastUpdated = moment.unix(localStorage.lastUpdated);
      lastUpdated.hour(0);
      lastUpdated.minute(0);
      lastUpdated.second(0);
      if (moment().diff(lastUpdated, 'days') < 1) {
        return;
      }
    }
    this.reset();
  }

  private updateLocalStorage() {
    localStorage.lastUpdated = moment().unix();
    localStorage.results = JSON.stringify(this.results);
  }

  private findFromResults(questionId: string) {
    return this.results.findIndex((result) => result.questionId === questionId);
  }
}
