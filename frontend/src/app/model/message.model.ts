import { Mentor } from "./mentor.model";
import { User } from "./user";

export interface Message {
    id?: number; // Optionnel car il sera généré par le backend
    sender: User;
    receiver: User;
    content: string;
    dateSent: Date;
    isRead: boolean;
    replyContent?: string; 
  }