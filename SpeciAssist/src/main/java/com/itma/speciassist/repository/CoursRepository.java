package com.itma.speciassist.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itma.speciassist.model.Cours;


public interface CoursRepository extends JpaRepository<Cours, Integer> {
	
	Optional<Cours> findById(Integer id);

	  
    List<Cours> findByMentor_Id(Long mentorId); // Utilisation de _ pour accéder à l'ID du mentor
 
	 List<Cours> findByFormationId(Integer formationId);


	List<Cours> findByFormation_Titre(String titreFormation);


	List<Cours> findByFormation_Id(Integer formationId);


}