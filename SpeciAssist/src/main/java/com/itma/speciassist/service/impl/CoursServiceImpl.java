package com.itma.speciassist.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.itma.speciassist.model.Cours;
import com.itma.speciassist.repository.CoursRepository;
import com.itma.speciassist.service.CoursService;

@Service
public class CoursServiceImpl implements CoursService {
    
    @Autowired
    private CoursRepository coursRepository;
    
    @Override
    public Cours addCours(Cours cours) {
        return coursRepository.save(cours);
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
    public List<Cours> getCoursesByMentorId(Long mentorId) {  // Implémenter cette méthode
        return coursRepository.findByMentorsId(mentorId);
    }
}
