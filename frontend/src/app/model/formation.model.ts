export class Formation {
    id?: number;
    titre: string;
    description: string;
    duree: string;
    prix: number;
    contenu: string;
  
    constructor() {
      this.id = 0;
      this.titre = '';
      this.description = '';
      this.duree = '';
      this.prix = 0;
      this.contenu = '';
    }
  }
  