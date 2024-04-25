package com.itma.speciassist.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itma.speciassist.model.Cours;


public interface CoursRepository extends JpaRepository<Cours, Integer> {
	
	Optional<Cours> findById(Integer id);

}