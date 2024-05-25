package com.itma.speciassist.service.impl;

import java.util.List;
import java.util.Optional;

import org.hibernate.Hibernate;
import org.springframework.stereotype.Service;

import com.itma.speciassist.model.Etablissement;
import com.itma.speciassist.model.Formation;
import com.itma.speciassist.repository.FormationRepository;
import com.itma.speciassist.service.FormationService;


@Service
public class FormationServiceImpl implements FormationService {

    private final FormationRepository formationRepository;

    
    public FormationServiceImpl(FormationRepository formationRepository) {
        this.formationRepository = formationRepository;
    }

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
        return formationRepository.save(formation);
    }

    @Override
    public Formation updateFormation(Integer id, Formation updatedFormation) {
        Optional<Formation> existingFormationOptional = formationRepository.findById(id);
        if (existingFormationOptional.isPresent()) {
            updatedFormation.setId(id);
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

    
    @Override
    public Optional<Formation> getFormationWithEtablissements(Integer id) {
        return formationRepository.findById(id).map(formation -> {
            Hibernate.initialize(formation.getEtablissements()); // Ensure lazy-loaded collections are initialized
            return formation;
        });
    }
    @Override
    public Optional<Formation> getFormationWithEtablissementsByTitre(String titre) {
        Optional<Formation> formationOpt = formationRepository.findByTitre(titre);
        if (formationOpt.isPresent()) {
            Formation formation = formationOpt.get();
            Hibernate.initialize(formation.getEtablissements()); // Assurez-vous que les collections en lazy loading sont initialisées
            System.out.println("Formation trouvée : " + formation.getTitre());
            System.out.println("Nombre d'établissements : " + formation.getEtablissements().size());
            for (Etablissement etablissement : formation.getEtablissements()) {
                System.out.println("Etablissement : " + etablissement.getNom() + ", Lieu : " + etablissement.getLieu());
            }
        } else {
            System.out.println("Aucune formation trouvée avec le titre : " + titre);
        }
        return formationOpt;
    }
}
