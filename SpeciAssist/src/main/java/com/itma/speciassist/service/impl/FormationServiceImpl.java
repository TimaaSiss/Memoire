package com.itma.speciassist.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

import com.itma.speciassist.model.Carriere;
import com.itma.speciassist.model.Etablissement;
import com.itma.speciassist.model.Formation;
import com.itma.speciassist.repository.CarriereRepository;
import com.itma.speciassist.repository.EtablissementRepository;
import com.itma.speciassist.repository.FormationRepository;
import com.itma.speciassist.service.FormationService;

import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;


@Service
@Transactional
@AllArgsConstructor
public class FormationServiceImpl implements FormationService {

    private final FormationRepository formationRepository;
    private final EtablissementRepository etablissementRepository;
    private final CarriereRepository carriereRepository;

    
   
    @Override
    public List<Formation> getAllFormations() {
        return formationRepository.findAll();
    }

    @Override
    public Formation getFormationById(Integer id) {
        Optional<Formation> formationOptional = formationRepository.findById(id);
        return formationOptional.orElse(null);
    }

    @Override
    public Formation createFormation(Formation formation) {
        // Récupérez les carrières associées à partir des IDs
        List<Carriere> carrières = carriereRepository.findAllById(
            formation.getCarrieres().stream().map(Carriere::getId).collect(Collectors.toList())
        );
        formation.setCarrieres(carrières); // Associez les carrières à la formation
        return formationRepository.save(formation);
    }

    @Override
    public Formation updateFormation(Integer id, Formation updatedFormation) {
        Optional<Formation> existingFormationOptional = formationRepository.findById(id);
        if (existingFormationOptional.isPresent()) {
            updatedFormation.setId(id);
            List<Carriere> carrières = carriereRepository.findAllById(
                updatedFormation.getCarrieres().stream().map(Carriere::getId).collect(Collectors.toList())
            );
            updatedFormation.setCarrieres(carrières); // Mettez à jour les carrières associées
            return formationRepository.save(updatedFormation);
        }
        return null;
    }

    @Override
    public void deleteFormation(Integer id) {
        formationRepository.deleteById(id);
    }
    
    @Override
    public Formation getFormationByTitre(String titre) {
        Optional<Formation> formation = formationRepository.findByTitre(titre);
        if (formation.isPresent()) {
            Hibernate.initialize(formation.get().getEtablissements()); // Initialize lazy-loaded collections
        }
        return formation.orElse(null);
    }

	/*
	 * @Override public Optional<Formation> getFormationWithEtablissements(Integer
	 * id) { return formationRepository.findById(id).map(formation -> {
	 * Hibernate.initialize(formation.getEtablissements()); // Ensure lazy-loaded
	 * collections are initialized return formation; }); }
	 */
    @Override
   public List<Etablissement> getEtablissementsWithFormation(String titre) {
        Optional<Formation> formationOpt = formationRepository.findByTitre(titre);
        if (formationOpt.isPresent()) {
        	
        	return formationOpt.get().getEtablissements();
           /* Formation formation = formationOpt.get();
            Hibernate.initialize(formation.getEtablissements()); // Assurez-vous que les collections en lazy loading sont initialisées
            System.out.println("Formation trouvée : " + formation.getTitre());
            System.out.println("Nombre d'établissements : " + formation.getEtablissements().size());
            for (Etablissement etablissement : formation.getEtablissements()) {
                System.out.println("Etablissement : " + etablissement.getNom() + ", Lieu : " + etablissement.getLieu());
            }
        } else {
            System.out.println("Aucune formation trouvée avec le titre : " + titre);
        }
        return formationOpt;*/
        }	
        return null;
    }
    
    public void addEtab(int idFormation, List<Etablissement> etablissements) {
    	Formation f=getFormationById(idFormation);
		f.getEtablissements().addAll(etablissements);
		createFormation(f);
    }

	
}
        

