import { Message } from './Message';
import { Question } from './Question';
import { Choices } from './Choices';

export interface StartMessage extends Message {
  state: 'start'
  question: Question
  choices: Choices
}