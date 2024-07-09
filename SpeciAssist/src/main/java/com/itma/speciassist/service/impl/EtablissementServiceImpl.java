package com.itma.speciassist.service.impl;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.itma.speciassist.model.Etablissement;
import com.itma.speciassist.model.Formation;
import com.itma.speciassist.repository.EtablissementRepository;
import com.itma.speciassist.repository.FormationRepository;
import com.itma.speciassist.service.EtablissementService;

import jakarta.transaction.Transactional;

@Service
@Transactional
public class EtablissementServiceImpl implements EtablissementService {
    
    @Autowired
    private EtablissementRepository etablissementRepository;
    
    @Autowired
    private FormationRepository formationRepository;
    
    @Override
    public Etablissement addEtablissement(Etablissement etablissement) {
        List<Formation> formations = formationRepository.findAllById(
            etablissement.getFormations().stream().map(Formation::getId).toList()
        );
        etablissement.setFormations(formations);
        return etablissementRepository.save(etablissement);
    }

    @Override
    public List<Etablissement> allEtablissements() {
        return etablissementRepository.findAll();
    }

    @Override
    public Etablissement getEtablissement(Integer id) {
        return etablissementRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Etablissement not found with ID: " + id));
    }

    
    @Override
    public Etablissement updateEtablissement(Integer id, Etablissement etablissement) {
        if (!etablissementRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Etablissement not found with ID: " + id);
        }
        etablissement.setId(id);

        // Initialiser la liste des formations si elle est null
        if (etablissement.getFormations() == null) {
            etablissement.setFormations(new ArrayList<>());
        }

        List<Formation> formations = formationRepository.findAllById(
            etablissement.getFormations().stream().map(Formation::getId).toList()
        );
        etablissement.setFormations(formations);
        return etablissementRepository.save(etablissement);
    }

    @Override
    public void deleteEtablissement(Integer id) {
        if (!etablissementRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Etablissement not found with ID: " + id);
        }
        etablissementRepository.deleteById(id);
    }


	@Override
	public Etablissement getEtablissementById(Integer etablissementId) {
		// TODO Auto-generated method stub
		return null;
	}
}
