import { Message } from './Message';

export interface ShowMessage extends Message {
  state: 'show'
  question?: {
    id: string,
    description: string,
  }
  choices?: {
    a: {
      description: string,
    },
    b: {
      description: string,
    },
    c: {
      description: string,
    },
    d: {
      description: string,
    },
  }
}