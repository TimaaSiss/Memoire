package com.itma.speciassist.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itma.speciassist.model.Carriere;


public interface CarriereRepository extends JpaRepository<Carriere, Integer> {
	
	Optional<Carriere> findById(Integer id);
	


	Optional<Carriere> findByNom(String nom);

}