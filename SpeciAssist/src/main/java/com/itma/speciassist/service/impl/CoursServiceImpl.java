package com.itma.speciassist.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.itma.speciassist.model.Cours;
import com.itma.speciassist.model.Formation;
import com.itma.speciassist.repository.CoursRepository;
import com.itma.speciassist.service.CoursService;
import com.itma.speciassist.service.FormationService;

@Service
public class CoursServiceImpl implements CoursService {
    
    @Autowired
    private CoursRepository coursRepository;
    @Autowired
    private FormationService formationService;
    
    @Override
    public Cours addCours(Long mentorId, Cours cours) {
        // Récupérer le mentor par son ID (si nécessaire)
        // Mentor mentor = mentorRepository.findById(mentorId)
        //                 .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Mentor not found"));

        // Affecter le mentor au cours
        // cours.setMentor(mentor);

        // Enregistrer le cours dans la base de données
        Cours savedCours = coursRepository.save(cours);

        // Associer le cours à la formation correspondante
        associateCoursWithFormation(savedCours);

        return savedCours;
    }
    
    
    public void associateCoursWithFormation(Cours cours) {
        // Récupérer le titre du cours
        String coursTitre = cours.getTitre();

        // Rechercher une formation correspondant à au moins un mot du titre du cours
        Formation formation = null;
        List<Formation> formations = formationService.getAllFormations(); // Supposons que getAllFormations() renvoie toutes les formations

        for (Formation form : formations) {
            if (coursTitre.toLowerCase().contains(form.getTitre().toLowerCase())) {
                formation = form;
                break;
            }
        }

        if (formation != null) {
            cours.setFormation(formation);
            coursRepository.save(cours);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Formation not found for course: " + coursTitre);
        }
    }

    
    @Override
    public List<Cours> allCours() {
        return coursRepository.findAll();
    }

    @Override
    public Cours getCours(Integer id) {
        return coursRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Cours not found with ID: " + id));
    }

    @Override
    public Cours updateCours(Integer id, Cours cours) {
        if (!coursRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cours not found with ID: " + id);
        }
        cours.setId(id);
        return coursRepository.save(cours);
    }

    @Override
    public void deleteCours(Integer id) {
        if (!coursRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Cours not found with ID: " + id);
        }
        coursRepository.deleteById(id);
    }
    
    @Override
    public List<Cours> getCoursesByMentorId(Long mentorId) {
        return coursRepository.findByMentor_Id(mentorId);
    }
    
    @Override
    public List<Cours> getCoursByFormation(String titreFormation) {
        return coursRepository.findByFormation_Titre(titreFormation);
    }

}
