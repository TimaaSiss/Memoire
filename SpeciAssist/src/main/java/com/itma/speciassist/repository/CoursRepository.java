package com.itma.speciassist.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itma.speciassist.model.Cours;


public interface CoursRepository extends JpaRepository<Cours, Integer> {
	
	Optional<Cours> findById(Integer id);

	 List<Cours> findByMentorsId(Long mentorId);

	//List<Cours> findByMentorId(Long mentorId);

}