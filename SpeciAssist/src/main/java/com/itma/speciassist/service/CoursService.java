package com.itma.speciassist.service;

import java.util.List;

import com.itma.speciassist.model.Cours;
import com.itma.speciassist.model.Formation;

public interface CoursService {

    Cours getCours(Integer id);

    List<Cours> allCours();

   // Cours addCours(Cours cours);

    Cours updateCours(Integer id, Cours cours);

    void deleteCours(Integer id);

	List<Cours> getCoursesByMentorId(Long mentorId);

	 Cours addCours(Long mentorId, Integer formationId, Cours cours);

	 
	
	 List<Cours> getCoursesByFormation(Integer formationId);

	void addCourseToFormation(Cours newCourse);

	long getCoursCount();

	

}

