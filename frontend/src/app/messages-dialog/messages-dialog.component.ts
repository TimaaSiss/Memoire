import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Message } from '@app/model/message.model';

@Component({
  selector: 'app-messages-dialog',
  templateUrl: './messages-dialog.component.html',
  styleUrls: ['./messages-dialog.component.scss']
})
export class MessagesDialogComponent implements OnInit {
  messages: Message[] = [];

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.messages = data.messages;
  }

  ngOnInit(): void {
  }
}
