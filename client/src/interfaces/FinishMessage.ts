import { Message } from './Message';

export interface FinishMessage extends Message {
  state: 'finish'
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
  correct?: {
    choice: 'a' | 'b' | 'c' | 'd',
    description: string,
  }
}