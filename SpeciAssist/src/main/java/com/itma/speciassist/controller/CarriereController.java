package com.itma.speciassist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itma.speciassist.model.Carriere;
import com.itma.speciassist.service.CarriereService;

@RestController
@RequestMapping("/carrieres")
public class CarriereController {

    @Autowired
    private CarriereService carriereService;

    @GetMapping("/allCarrieres")
    public List<Carriere> getAllCarrieres() {
        return carriereService.allCarrieres();
    }

    @GetMapping("/getCarriere/{id}")
    public Carriere getCarriereById(@PathVariable Integer id) {
        return carriereService.getCarriere(id);
    }
    
    @GetMapping("/getCarriereByName/{nom}")
    public Carriere getCarriereByNom(@PathVariable String nom) {
        return carriereService.getCarriereByNom(nom);
    }

    @PostMapping("/addCarriere")
    public Carriere addCarriere(@RequestBody Carriere carriere) {
        return carriereService.addCarriere(carriere);
    }

    @PutMapping("/updateCarriere/{id}")
    public Carriere updateCarriere(@PathVariable Integer id, @RequestBody Carriere carriere) {
        return carriereService.updateCarriere(id, carriere);
    }

    @DeleteMapping("/deleteCarriere/{id}")
    public void deleteCarriere(@PathVariable Integer id) {
        carriereService.deleteCarriere(id);
    }
}
