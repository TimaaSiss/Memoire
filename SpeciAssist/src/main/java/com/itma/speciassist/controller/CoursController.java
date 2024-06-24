package com.itma.speciassist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.itma.speciassist.model.Cours;
import com.itma.speciassist.model.Formation;
import com.itma.speciassist.service.CoursService;
import com.itma.speciassist.service.FormationService;

@RestController
@RequestMapping("/cours")
public class CoursController {

    @Autowired
    private CoursService coursService;

    @Autowired
    private FormationService formationService;

    // Endpoint pour ajouter un cours
    @PostMapping("/add/{mentorId}/{formationId}")
    public ResponseEntity<Cours> addCours(
            @PathVariable("mentorId") Long mentorId,
            @PathVariable("formationId") Integer formationId,
            @RequestBody Cours cours) {
        Cours addedCours = coursService.addCours(mentorId, formationId, cours);
        return new ResponseEntity<>(addedCours, HttpStatus.CREATED);
    }

    // Endpoint pour récupérer tous les cours
    @GetMapping()
    public ResponseEntity<List<Cours>> getAllCours() {
        List<Cours> coursList = coursService.allCours();
        return new ResponseEntity<>(coursList, HttpStatus.OK);
    }

    // Endpoint pour récupérer un cours par son ID
    @GetMapping("/{id}")
    public ResponseEntity<Cours> getCoursById(@PathVariable("id") Integer id) {
        Cours cours = coursService.getCours(id);
        return new ResponseEntity<>(cours, HttpStatus.OK);
    }
    
    @GetMapping("/formation/{formationId}")
    public ResponseEntity<List<Cours>> getCoursesByFormation(@PathVariable Integer formationId) {
        List<Cours> courses = coursService.getCoursesByFormation(formationId);
        return ResponseEntity.ok(courses);
    }

    // Endpoint pour mettre à jour un cours
    @PutMapping("/{id}")
    public ResponseEntity<Cours> updateCours(@PathVariable("id") Integer id, @RequestBody Cours cours) {
        Cours updatedCours = coursService.updateCours(id, cours);
        return new ResponseEntity<>(updatedCours, HttpStatus.OK);
    }

    // Endpoint pour supprimer un cours
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCours(@PathVariable("id") Integer id) {
        coursService.deleteCours(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    // Endpoint pour récupérer tous les cours d'un mentor
    @GetMapping("/mentor/{mentorId}")
    public ResponseEntity<List<Cours>> getCoursesByMentorId(@PathVariable("mentorId") Long mentorId) {
        List<Cours> coursList = coursService.getCoursesByMentorId(mentorId);
        return new ResponseEntity<>(coursList, HttpStatus.OK);
    }

    // Endpoint pour récupérer toutes les formations
    @GetMapping("/formations")
    public ResponseEntity<List<Formation>> getAllFormations() {
        List<Formation> formations = formationService.getAllFormations();
        return new ResponseEntity<>(formations, HttpStatus.OK);
    }
}
