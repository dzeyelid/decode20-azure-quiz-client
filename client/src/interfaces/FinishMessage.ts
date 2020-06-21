import { Message } from './Message';
import { Question } from './Question';
import { Choices } from './Choices';

export interface FinishMessage extends Message {
  state: 'finish'
  question: Question
  choices: Choices
  correct: {
    choice: 'a' | 'b' | 'c' | 'd',
    description: string,
  }
}