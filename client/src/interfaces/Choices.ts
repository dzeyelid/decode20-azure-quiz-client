import { Choice } from './Choice';

export interface Choices {
  hasOwnProoerty<T>(this: T, v: any): v is keyof T,
  a: Choice,
  b: Choice,
  c: Choice,
  d: Choice,
}