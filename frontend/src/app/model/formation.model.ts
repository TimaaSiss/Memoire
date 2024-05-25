import { Etablissement } from "./etablissement.model";

export class Formation {
    id?: number;
    titre: string;
    description: string;
    duree: string;
    prix: number;
    contenu: string;
    etablissements!: Etablissement[];
  
    constructor() {
      this.id = 0;
      this.titre = '';
      this.description = '';
      this.duree = '';
      this.prix = 0;
      this.contenu = '';
      this.etablissements=[]
    }
  }
  