import { Result } from '@/interfaces/Result';

export default class ResultRepository {
  private results: Result[] = [];

  constructor() {
    this.load();
  }

  private load(): void {
    if (!localStorage.results) {
      localStorage.results = JSON.stringify([]);
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

  private updateLocalStorage() {
    localStorage.results = JSON.stringify(this.results);
  }

  private findFromResults(questionId: string) {
    return this.results.findIndex((result) => result.questionId === questionId);
  }
}
