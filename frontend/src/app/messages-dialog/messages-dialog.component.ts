// messages-dialog.component.ts
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MessageService } from '../services/message.service';
import { Message } from '../model/message.model';

@Component({
  selector: 'app-messages-dialog',
  templateUrl: './messages-dialog.component.html',
  styleUrls: ['./messages-dialog.component.scss']
})
export class MessagesDialogComponent implements OnInit {
  messages: Message[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<MessagesDialogComponent>,
    private messageService: MessageService
  ) {
    console.log('Données reçues dans le dialogue:', data); // Ajoutez ce log pour déboguer
    this.messages = data.messages;
  }

  ngOnInit(): void {}

  sendReply(message: Message): void {
    // Vérifiez si les données requises existent et ajoutez des logs pour diagnostiquer
    if (!this.data.currentUser) {
      console.error('Utilisateur actuel manquant');
      return;
    } else if (!message.sender) {
      console.error('Expéditeur du message manquant');
      return;
    } else if (!message.replyContent || message.replyContent.trim() === '') {
      console.error('Contenu de la réponse manquant');
      return;
    }

    const replyMessage = {
      senderId: this.data.currentUser.id, // l'utilisateur actuel envoyant la réponse
      receiverId: message.sender.id, // l'expéditeur original du message
      content: message.replyContent.trim()
    };

    this.messageService.sendMessage(replyMessage).subscribe(
      response => {
        console.log('Réponse envoyée avec succès:', response);
        // Optionnel: fermez le dialogue ou donnez un retour à l'utilisateur
        this.dialogRef.close();
      },
      error => {
        console.error('Erreur lors de l\'envoi de la réponse:', error);
      }
    );
  }
}
