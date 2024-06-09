import { Carriere } from "./carriere.model";
import { User } from "./user";

export interface Commentaire {
    id?: number;
    contenu: string;
    datePublication?: Date;
    carriere?: Carriere;
    user?: User;
  }