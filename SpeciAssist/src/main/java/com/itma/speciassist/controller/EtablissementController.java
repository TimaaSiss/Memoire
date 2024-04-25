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

import com.itma.speciassist.model.Etablissement;
import com.itma.speciassist.service.EtablissementService;

@RestController
@RequestMapping("/etablissements")
public class EtablissementController {

    @Autowired
    private EtablissementService etablissementService;

    @GetMapping("/allEtablissements")
    public List<Etablissement> getAllEtablissements() {
        return etablissementService.allEtablissements();
    }

    @GetMapping("/getEtablissement/{id}")
    public Etablissement getEtablissementById(@PathVariable Integer id) {
        return etablissementService.getEtablissement(id);
    }

    @PostMapping("/addEtablissement")
    public Etablissement addEtablissement(@RequestBody Etablissement etablissement) {
        return etablissementService.addEtablissement(etablissement);
    }

    @PutMapping("/updateEtablissement/{id}")
    public Etablissement updateEtablissement(@PathVariable Integer id, @RequestBody Etablissement etablissement) {
        return etablissementService.updateEtablissement(id, etablissement);
    }

    @DeleteMapping("/deleteEtablissement/{id}")
    public void deleteEtablissement(@PathVariable Integer id) {
        etablissementService.deleteEtablissement(id);
    }
}
