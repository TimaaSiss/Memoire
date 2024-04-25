package com.itma.speciassist.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.itma.speciassist.model.Carriere;
import com.itma.speciassist.repository.CarriereRepository;
import com.itma.speciassist.service.CarriereService;

@Service
public class CarriereServiceImpl implements CarriereService {
    
    @Autowired
    private CarriereRepository carriereRepository;
    
    @Override
    public Carriere addCarriere(Carriere carriere) {
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
        return carriereRepository.save(carriere);
    }

    @Override
    public void deleteCarriere(Integer id) {
        if (!carriereRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Carriere not found with ID: " + id);
        }
        carriereRepository.deleteById(id);
    }
}
