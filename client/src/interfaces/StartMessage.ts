import { Message } from './Message';

export interface StartMessage extends Message {
  state: 'start'
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