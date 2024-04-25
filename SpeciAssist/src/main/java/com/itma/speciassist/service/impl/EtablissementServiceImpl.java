package com.itma.speciassist.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.itma.speciassist.model.Etablissement;
import com.itma.speciassist.repository.EtablissementRepository;
import com.itma.speciassist.service.EtablissementService;

@Service
public class EtablissementServiceImpl implements EtablissementService {
    
    @Autowired
    private EtablissementRepository etablissementRepository;
    
    @Override
    public Etablissement addEtablissement(Etablissement etablissement) {
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
        return etablissementRepository.save(etablissement);
    }

    @Override
    public void deleteEtablissement(Integer id) {
        if (!etablissementRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Etablissement not found with ID: " + id);
        }
        etablissementRepository.deleteById(id);
    }
}
