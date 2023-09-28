import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface SoketResponse {
  ListofData: [];
}

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private socket!: WebSocket;
  private subject!: Subject<MessageEvent>;

  public connect(): Subject<MessageEvent> {
    const webSoketURL = "ws://192.168.1.189:5020/ws"
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      this.socket = new WebSocket(webSoketURL);
      this.subject = new Subject<MessageEvent>();

      this.socket.onopen = (event) => {
        console.log('WebSocket connection established.');
      };

      this.socket.onmessage = (event) => {
        this.subject.next(event);
      };

      this.socket.onclose = (event) => {
        console.log('WebSocket connection closed.');
        this.subject.complete();
      };
    }

    return this.subject;
  }

  public close(): void {
    if (this.socket) {
      this.socket.close();
      this.connect();
    }
  }
}
