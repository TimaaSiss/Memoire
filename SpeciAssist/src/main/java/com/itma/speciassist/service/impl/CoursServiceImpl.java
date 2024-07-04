package com.itma.speciassist.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.itma.speciassist.model.Cours;
import com.itma.speciassist.model.Formation;
import com.itma.speciassist.model.User;
import com.itma.speciassist.repository.CoursRepository;
import com.itma.speciassist.service.CoursService;
import com.itma.speciassist.service.FormationService;
import com.itma.speciassist.service.UserService;

@Service
public class CoursServiceImpl implements CoursService {

    @Autowired
    private CoursRepository coursRepository;

    @Autowired
    private FormationService formationService;
    private UserService userService;

    @Override
    public Cours addCours(Long mentorId, Integer formationId, Cours cours) {
      try { 
    	  Formation formation = formationService.getFormationById(formationId);
      
        if (formation == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Formation not found with ID: " + formationId);
        }
        cours.setFormation(formation);
        return coursRepository.save(cours);
        }catch (Exception e) {
        	System.out.println(e.getMessage());
        	return new Cours();
        }
        
} 
    
    
    @Override
    public void addCourseToFormation(Cours course) {
        coursRepository.save(course);
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
    public List<Cours> getCoursesByFormation(Integer formationId) {
        return coursRepository.findByFormation_Id(formationId);
    }
	/*
	 * @Override public void associateCoursWithFormation(Cours cours) { // TODO
	 * Auto-generated method stub
	 * 
	 * }
	 */
    
    public long getCoursCount() {
        return coursRepository.count(); // Cela compte tous les cours enregistrés dans la base de données
    }
}
