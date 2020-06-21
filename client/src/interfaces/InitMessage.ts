import { Message } from './Message';

export interface InitMessage extends Message {
  state: 'init'
} 