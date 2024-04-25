package com.itma.speciassist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.itma.speciassist.model.Mentor;

@Repository
public interface MentorRepository extends JpaRepository<Mentor, Integer> {
    // Ajoutez ici des méthodes personnalisées si nécessaire
}
