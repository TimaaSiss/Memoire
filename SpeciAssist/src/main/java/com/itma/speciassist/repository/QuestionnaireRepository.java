package com.itma.speciassist.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.itma.speciassist.model.Questionnaire;

@Repository
public interface QuestionnaireRepository extends JpaRepository<Questionnaire, Long> {
	
	 @Query("SELECT DISTINCT q FROM Questionnaire q JOIN q.questions question WHERE question.id NOT IN (SELECT r.question.id FROM ReponseUser r WHERE r.user.id = :userId)")
	    List<Questionnaire> findQuestionnairesWithUnansweredQuestionsByUserId(@Param("userId") Long userId);

}
