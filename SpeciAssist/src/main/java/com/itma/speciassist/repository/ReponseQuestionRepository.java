package com.itma.speciassist.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.itma.speciassist.model.ReponseQuestion;

@Repository
public interface ReponseQuestionRepository extends JpaRepository<ReponseQuestion, Integer> {
    // Définition de méthodes personnalisées si nécessaire
}
