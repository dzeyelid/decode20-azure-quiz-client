import { Question } from './Question';

export type AnswerId = 'a' | 'b' | 'c' | 'd';

export interface AnswerMessage {
  identifier: string;
  nickname: string;
  question_id: Question['id'];
  answer_id: AnswerId;
  isFirst: boolean;
}
