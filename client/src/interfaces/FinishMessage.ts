import { Message } from './Message';
import { Question } from './Question';
import { Choices } from './Choices';
import { AnswerId } from './AnswerMessage';

export interface FinishMessage extends Message {
  state: 'finish'
  question: Question
  choices: Choices
  correct: {
    choice: AnswerId,
    description: string,
  }
}