import { Question } from './Question';

export type AnswerId = 'a' | 'b' | 'c' | 'd';

export interface AnswerMessage {
  identifier: string,
  question_id: Question['id'],
  answer_id: AnswerId,
}
