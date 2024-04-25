package com.itma.speciassist.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

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
}
