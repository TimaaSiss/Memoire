package com.itma.speciassist.repository;
import org.springframework.data.jpa.repository.JpaRepository;

import com.itma.speciassist.model.ReponseOpenAI;

public interface ReponseOpenAIRepository extends JpaRepository<ReponseOpenAI, Integer> {
}
