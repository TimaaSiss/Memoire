import { Formation } from "./formation.model";

export class Etablissement {
    id!: number;
    nom!: string;
    code_libelle!: string;
    lieu!: string;
    telephone!: string;
    email!: string;
    formations!: Formation[];
  }