import * as signalR from '@microsoft/signalr';
import axios from 'axios';
import { Message } from '../interfaces/Message';

export default class SignalRClient {
  connection: signalR.HubConnection;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('/api')
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();
  }

  setHandler(handler: (receivedMessage: Message) => void): void {
    this.connection.on('newMessage', handler);
  }

  start(): Promise<void> {
    return this.connection.start().catch((err: any) => { console.error(err.toString()); });
  }

  send = (message: Message) => {
    axios.post('/api/messages', message);
  }
}
