import { Message } from '../interfaces/Message';

export default class State {
  private state: Message['state'];

  constructor(state: Message['state'] = 'init') {
    this.state = state;
  }

  public setState(theState: Message['state']) {
    this.state = theState;
  }

  isInit() { return this.state === 'init'; }

  isShow() { return this.state === 'show'; }

  isStart() { return this.state === 'start'; }

  isFinish() { return this.state === 'finish'; }

  isResult() { return this.state === 'result'; }
}
