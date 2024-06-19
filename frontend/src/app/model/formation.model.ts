import { Carriere } from "./carriere.model";
import { Course } from "./cours.model";
import { Etablissement } from "./etablissement.model";

export class Formation {
    id!: number;
    titre: string;
    description: string;
    duree: string;
    prix: number;
    contenu: string;
    image:string;
    etablissements!: Etablissement[];
    carrieres!: Carriere[];
    courses!: Course[];
  
    constructor() {
      this.id = 0;
      this.titre = '';
      this.description = '';
      this.duree = '';
      this.prix = 0;
      this.contenu = '';
      this.image='';
      this.etablissements=[],
      this.carrieres=[],
      this.courses=[]
    }
  }
  