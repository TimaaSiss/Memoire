package com.itma.speciassist.controller;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itma.speciassist.model.Cours;
import com.itma.speciassist.model.Etablissement;
import com.itma.speciassist.model.Formation;
import com.itma.speciassist.service.CoursService;
import com.itma.speciassist.service.EtablissementService;
import com.itma.speciassist.service.FormationService;

@RestController
@RequestMapping("/formations")
public class FormationController {
   
	@Autowired
    private final FormationService formationService;
    private EtablissementService etablissementService;
    private CoursService coursService; // Assurez-vous que cette dépendance est correctement injectée


    public FormationController(FormationService formationService) {
        this.formationService = formationService;
    }

    @GetMapping("/allFormations")
    public ResponseEntity<List<Formation>> getAllFormations() {
        List<Formation> formations = formationService.getAllFormations();
        return new ResponseEntity<>(formations, HttpStatus.OK);
    }
    
    // Endpoint pour récupérer les cours associés à une formation par titre
    @GetMapping("/cours/{titreFormation}")
    public List<Cours> getCoursByFormation(@PathVariable String titreFormation) {
        return coursService.getCoursByFormation(titreFormation);
    }

    @GetMapping("/getFormation/{id}")
    public ResponseEntity<Formation> getFormationById(@PathVariable Integer id) {
        Formation formation = formationService.getFormationById(id);
        if (formation != null) {
            return new ResponseEntity<>(formation, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
	/*
	 * @GetMapping("/{id}") public ResponseEntity<Formation>
	 * getFormation(@PathVariable Integer id) { return
	 * formationService.getFormationWithEtablissements(id) .map(ResponseEntity::ok)
	 * .orElse(ResponseEntity.notFound().build()); }
	 */
    
    @GetMapping("/getFormationByTitre/{titre}")
    public ResponseEntity<Formation> getFormationBytitre(@PathVariable String titre) {
        System.out.println("Received titre: " + titre);  // Log received title
        Formation formation = formationService.getFormationByTitre(titre);
        if (formation != null) {
            System.out.println("Formation found: " + formation.getTitre());  // Log found formation
            return new ResponseEntity<>(formation, HttpStatus.OK);
        }
        System.out.println("Formation not found for titre: " + titre);  // Log not found
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    @GetMapping("/{titre}/etablissements")
    public ResponseEntity<List<Etablissement>> getEtablissementsWithFormation(@PathVariable String titre) {
        List<Etablissement> formation = formationService.getEtablissementsWithFormation(titre);
        if (formation != null) {
            return new ResponseEntity<>(formation, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    
    
    @PostMapping("/formations/{formationId}/etablissements/{etablissementId}")
    public ResponseEntity<Formation> addEtablissementToFormation(
        @PathVariable Integer formationId,
        @PathVariable Integer etablissementId
        
    ) {
        Formation formation = formationService.getFormationById(formationId);
        Etablissement etablissement = etablissementService.getEtablissementById(etablissementId);

        if (formation != null && etablissement != null) {
            formation.getEtablissements().add(etablissement);
            formationService.updateFormation(formationId, formation);
            return ResponseEntity.ok(formation);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    @PostMapping("/add")
    public ResponseEntity<Formation> createFormation(@RequestBody Formation formation) {
        Formation createdFormation = formationService.createFormation(formation);
        return new ResponseEntity<>(createdFormation, HttpStatus.CREATED);
    }
    

    @PutMapping("/update/{id}")
    public ResponseEntity<Formation> updateFormation(@PathVariable Integer id, @RequestBody Formation formation) {
        Formation updatedFormation = formationService.updateFormation(id, formation);
        if (updatedFormation != null) {
            return new ResponseEntity<>(updatedFormation, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFormation(@PathVariable Integer id) {
        formationService.deleteFormation(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
