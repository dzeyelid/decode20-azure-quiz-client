import * as signalR from '@microsoft/signalr';
import axios from 'axios';

export default class SignalRClient {
  connection: signalR.HubConnection;

  constructor() {
    this.connection = new signalR.HubConnectionBuilder()
      .withUrl('/api')
      .configureLogging(signalR.LogLevel.Information)
      .withAutomaticReconnect()
      .build();
  }

  // eslint-disable-next-line
  setHandler(methodName: string, handler: (...args: any[]) => void): void {
    // this.connection.on(methodName, handler);
    console.log('setHandler');
    this.connection.on('newMessage', (username: string, message: string) => {
      console.log('aaaaaaaaaaaa');
      console.log(username);
      console.log(message);
    });
  }

  start(): Promise<void> {
    return this.connection.start().catch((err) => { console.error(err.toStoring()); });
  }

  send = async (methodName: string, user: string, message: string) => {
    axios.post('/api/messages', {
      sender: user,
      text: message,
    }).then((response) => { console.log(response); });

    // return this.connection.send('methodName', user, message)
    //   .then(() => { console.log('Sent'); })
    //   .catch((err) => { console.error(err.toStoring()); });
  }
}
