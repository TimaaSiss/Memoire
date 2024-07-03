import { Formation } from "./formation.model";

export class Carriere {
    id!: number;
    nom!: string;
    description!: string;
    secteur!: string;
    competences_requises!: string;
    salaire!: string;
    image!:string;
    formations!:Formation[];
    mentorId!: number;
  }
  