import { Questionnaire } from "./questionnaire";

describe('Questionnaire', () => {
  it('should create an instance', () => {
    // Créez une liste de questions fictive pour les besoins du test
    const questions = []= []; // Ajoutez des questions si nécessaire
    
    // Créez une instance de Questionnaire en fournissant les arguments requis
    const questionnaire = new Questionnaire(1, 'Titre du questionnaire', questions);
    
    // Vérifiez si l'instance de Questionnaire a été créée avec succès
    expect(questionnaire).toBeTruthy();
  });
});
