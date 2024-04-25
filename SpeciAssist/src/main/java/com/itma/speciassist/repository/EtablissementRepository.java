package com.itma.speciassist.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itma.speciassist.model.Etablissement;


public interface EtablissementRepository extends JpaRepository<Etablissement, Long> {
	
	Optional<Etablissement> findById(Integer id);

	boolean existsById(Integer id);

	void deleteById(Integer id);
	
	Optional<Etablissement> findByTelephone(String tel);

}
