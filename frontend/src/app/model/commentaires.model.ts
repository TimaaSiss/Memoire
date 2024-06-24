import { Carriere } from "./carriere.model";
import { Formation } from "./formation.model";
import { User } from "./user";

export interface Commentaire {
    id?: number;
    contenu: string;
    datePublication?: Date;
    carriere?: Carriere;
    formation?:Formation;
    user?: User;
  }