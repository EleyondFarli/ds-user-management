import { Injectable } from '@angular/core';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import {catchError, tap, switchAll, filter} from 'rxjs/operators';
import {EMPTY, Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any> | undefined;
  private messagesSubject$ = new Subject();
  public messages$ = this.messagesSubject$.pipe(catchError(e => { throw e }));

  public connect(): void {
    this.socket$ = this.getNewWebSocket();
    this.socket$.pipe(
      tap({
        next: data => console.log('message received: ' + JSON.stringify(data)),
        error: error => console.log('error:', error),
      }), catchError(_ => EMPTY)).subscribe();

  }

  private getNewWebSocket() {
    console.log("Got here!");
    return webSocket({
      url: 'http://localhost:8087/ws',
      openObserver: {
        next: () => {
          console.log('WebSocket connection established.');
        }
      },
      closeObserver: {
        next: () => {
          console.log('WebSocket connection closed.');
        }
      },
    });
  }

  public sendMessage(msg: any) {
    if (this.socket$) {
      this.socket$.next(msg);
    }
  }

  public close() {
    if (this.socket$) {
      this.socket$.complete();
    }
  }
  public subscribeToTopic(topic: string): Observable<any> {
    if (this.socket$) {
      return this.socket$.pipe(
        filter(message => message.topic === topic),
      );
    } else {
      console.error('WebSocket connection not established');
      return EMPTY;
    }
  }

}
