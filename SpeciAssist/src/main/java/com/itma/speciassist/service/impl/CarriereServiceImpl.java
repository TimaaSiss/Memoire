package com.itma.speciassist.service.impl;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.itma.speciassist.model.Carriere;
import com.itma.speciassist.model.Formation;
import com.itma.speciassist.repository.CarriereRepository;
import com.itma.speciassist.repository.FormationRepository;
import com.itma.speciassist.service.CarriereService;

@Service
public class CarriereServiceImpl implements CarriereService {
    
    @Autowired
    private CarriereRepository carriereRepository;
    
    @Autowired
    private FormationRepository formationRepository;
    
    @Override
    public Carriere addCarriere(Carriere carriere) {
        List<Formation> formations = formationRepository.findAllById(
            carriere.getFormations().stream().map(Formation::getId).collect(Collectors.toList())
        );
        carriere.setFormations(formations);
        return carriereRepository.save(carriere);
    }

    @Override
    public List<Carriere> allCarrieres() {
        return carriereRepository.findAll();
    }

    @Override
    public Carriere getCarriere(Integer id) {
        return carriereRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Carriere not found with ID: " + id));
    }

    @Override
    public Carriere updateCarriere(Integer id, Carriere carriere) {
        if (!carriereRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Carriere not found with ID: " + id);
        }
        carriere.setId(id);
        List<Formation> formations = formationRepository.findAllById(
            carriere.getFormations().stream().map(Formation::getId).collect(Collectors.toList())
        );
        carriere.setFormations(formations);
        return carriereRepository.save(carriere);
    }

    @Override
    public void deleteCarriere(Integer id) {
        if (!carriereRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Carriere not found with ID: " + id);
        }
        carriereRepository.deleteById(id);
    }

    public Carriere getCarriereByNom(String nom) {
        Optional<Carriere> carriere = carriereRepository.findByNom(nom);
        return carriere.orElse(null);
    }
}
