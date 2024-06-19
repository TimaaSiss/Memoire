package com.itma.speciassist.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.itma.speciassist.model.Mentor;

@Repository
public interface MentorRepository extends JpaRepository<Mentor, Integer> {
    // Ajoutez ici des méthodes personnalisées si nécessaire
	  List<Mentor> findByCoursId(Integer coursId);

	Optional<Mentor> findById(Long mentorId);
}
