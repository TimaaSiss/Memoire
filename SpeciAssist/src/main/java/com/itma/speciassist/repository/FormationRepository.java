package com.itma.speciassist.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.itma.speciassist.model.Formation;

@Repository
public interface FormationRepository extends JpaRepository<Formation, Integer> {

	List<Formation> findAll();

	Optional<Formation> findByTitre(String titre);

	Formation findFormationWithCarrieresByTitre(String titre);
}
