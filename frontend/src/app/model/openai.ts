import { User } from "./user";

export class ReponseOpenAI {
    id!: number;
    utilisateur!: User; // Utilisateur associé à cette réponse
    reponseAPI!: string;
  }