import { Message } from './Message';
import { Question } from './Question';
import { Choices } from './Choices';

export interface ShowMessage extends Message {
  state: 'show'
  question: Question
  choices: Choices
}