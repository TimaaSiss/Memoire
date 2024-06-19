package com.itma.speciassist.service;

import java.util.List;

import com.itma.speciassist.model.Cours;

public interface CoursService {

    Cours getCours(Integer id);

    List<Cours> allCours();

   // Cours addCours(Cours cours);

    Cours updateCours(Integer id, Cours cours);

    void deleteCours(Integer id);

	List<Cours> getCoursesByMentorId(Long mentorId);

	Cours addCours(Long mentorId, Cours cours);

	void associateCoursWithFormation(Cours cours);

	List<Cours> getCoursByFormation(String titreFormation);

	

}

