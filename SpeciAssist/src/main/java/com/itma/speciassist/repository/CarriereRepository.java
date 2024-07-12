package com.itma.speciassist.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itma.speciassist.model.Carriere;


public interface CarriereRepository extends JpaRepository<Carriere, Integer> {
	
	Optional<Carriere> findById(Long carriereId);
	


	Optional<Carriere> findByNom(String nom);



	Optional<Carriere> findAllById(Integer carriereId);

}