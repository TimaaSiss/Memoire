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

import com.itma.speciassist.model.Cours;
import com.itma.speciassist.service.CoursService;

@RestController
@RequestMapping("/cours")
public class CoursController {

    @Autowired
    private CoursService coursService;

    @GetMapping()
    public List<Cours> getAllCours() {
        return coursService.allCours();
    }

    @GetMapping("/mentor/{mentorId}")  // Ajouter cette route
    public List<Cours> getCoursesByMentorId(@PathVariable Long mentorId) {
        return coursService.getCoursesByMentorId(mentorId);
    }
    @GetMapping("/{id}")
    public Cours getCoursById(@PathVariable Integer id) {
        return coursService.getCours(id);
    }

    @PostMapping()
    public Cours addCours(@RequestBody Cours cours) {
        return coursService.addCours(cours);
    }

    @PutMapping("/{id}")
    public Cours updateCours(@PathVariable Integer id, @RequestBody Cours cours) {
        return coursService.updateCours(id, cours);
    }

    @DeleteMapping("/{id}")
    public void deleteCours(@PathVariable Integer id) {
        coursService.deleteCours(id);
    }
}
