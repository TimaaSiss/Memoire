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
import com.itma.speciassist.service.CoursService;

@RestController
@RequestMapping("/cours")
public class CoursController {

    @Autowired
    private CoursService coursService;

 // Endpoint pour ajouter un cours
    @PostMapping("/add/{mentorId}")
    public ResponseEntity<Cours> addCours(@PathVariable("mentorId") Long mentorId, @RequestBody Cours cours) {
        Cours addedCours = coursService.addCours(mentorId, cours);
        return new ResponseEntity<>(addedCours, HttpStatus.CREATED);
    }

    // Endpoint pour récupérer tous les cours
    @GetMapping("/all")
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
}
