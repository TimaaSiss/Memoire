package com.itma.speciassist.repository;
import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.itma.speciassist.model.ReponseOpenAI;

public interface ReponseOpenAIRepository extends JpaRepository<ReponseOpenAI, Integer> {

	List<ReponseOpenAI> findByUserId(Integer userId);
}
