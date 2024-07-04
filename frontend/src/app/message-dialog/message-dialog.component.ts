import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '@app/services/message.service';

@Component({
  selector: 'app-message-dialog',
  templateUrl: './message-dialog.component.html',
  styleUrls: ['./message-dialog.component.scss']
})
export class MessageDialogComponent {
  messageForm: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<MessageDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private fb: FormBuilder,
    private messageService: MessageService
  ) {
    // Initialisation du formulaire avec une validation requise pour le contenu
    this.messageForm = this.fb.group({
      content: ['', Validators.required]
    });
  }

  onSend(): void {
    console.log(this.data);
    
    if (this.messageForm.valid) {
      // Prépare les données du message avec les IDs de l'expéditeur et du destinataire
      const messageData = {
        senderId: this.data.senderId,
        receiverId: this.data.receiverId,
        content: this.messageForm.get('content')?.value
      };

      // Envoie le message via le service MessageService
      this.messageService.sendMessage(messageData).subscribe(
        response => {
          // Ferme le dialogue avec la réponse du service
          this.dialogRef.close(response);
        },
        error => {
          console.error('Error sending message:', error);
        }
      );
    }
  }

  onCancel(): void {
    // Ferme le dialogue sans envoyer de message
    this.dialogRef.close();
  }
}
