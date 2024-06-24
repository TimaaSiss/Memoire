package com.itma.speciassist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.itma.speciassist.model.Commentaire;

@Repository
public interface CommentaireRepository extends JpaRepository<Commentaire, Integer> {
	 List<Commentaire> findByCarriereId(Integer carriereId);

	List<Commentaire> findByFormationId(Integer formationId);

}
