import { Message } from './Message';

export interface ResultMessage extends Message {
  state: 'result';
}
