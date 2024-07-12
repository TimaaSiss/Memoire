import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConfigService } from './config.service';
import { Message } from '@app/model/message.model';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private http: HttpClient, private configService: ConfigService) { }

  sendMessage(message: { senderId: number, receiverId: number, content: string }): Observable<Message> {
    return this.http.post<Message>(`${this.configService.apiUrl}/messages/send`, message);
  }

  getMessagesByReceiver(userId: number): Observable<any> {
    return this.http.get(`${this.configService.apiUrl}/messages/receiver/${userId}`);
  }

  getMessagesBySender(userId: number): Observable<any> {
    return this.http.get(`${this.configService.apiUrl}/messages/sender/${userId}`);
  }

  sendReply(reply: { messageId: number, senderId: number, content: string }): Observable<Message> {
    return this.http.post<Message>(`${this.configService.apiUrl}/messages/reply`, reply);
  }

  getUnreadMessagesCount(userId: number): Observable<number> {
    return this.http.get<number>(`${this.configService.apiUrl}/messages/unreadCount/${userId}`);
  }

  markMessagesAsRead(userId: number): Observable<void> {
    return this.http.put<void>(`${this.configService.apiUrl}/messages/markAsRead/${userId}`, {});
}

}