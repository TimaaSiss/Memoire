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
    public Cours addCours(Long mentorId, Integer formationId, Cours cours) {
        // Récupérer la formation par son ID
        Formation formation = formationService.getFormationById(formationId);
        if (formation == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Formation not found with ID: " + formationId);
        }

        // Associer le cours à la formation
        cours.setFormation(formation);

        // Enregistrer le cours dans la base de données
        return coursRepository.save(cours);
    }
    
    public void addCourseToFormation(Cours course, Formation formation) {
        course.setFormation(formation); // Assurez-vous que le modèle `Cours` a un champ `formation`
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
		// TODO Auto-generated method stub
		return null;
	}

	/*
	 * @Override public void associateCoursWithFormation(Cours cours) { // TODO
	 * Auto-generated method stub
	 * 
	 * }
	 */
}
