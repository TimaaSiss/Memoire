import { Carriere } from "./carriere.model";
import { Formation } from "./formation.model";

export class CarriereFormations{
    carriere!: Carriere;
    formations!:Formation

    constructor(carriere:Carriere, formations:Formation[]){
        this.carriere=carriere
    }
}