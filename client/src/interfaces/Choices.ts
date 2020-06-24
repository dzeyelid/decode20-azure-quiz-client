import { Choice } from './Choice';

export interface Choices {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  hasOwnProoerty<T>(this: T, v: any): v is keyof T;
  a: Choice;
  b: Choice;
  c: Choice;
  d: Choice;
}
