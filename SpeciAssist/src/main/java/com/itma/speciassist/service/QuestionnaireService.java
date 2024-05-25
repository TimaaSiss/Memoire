package com.itma.speciassist.service;

import java.util.List;

import com.itma.speciassist.model.Question;
import com.itma.speciassist.model.Questionnaire;

public interface QuestionnaireService {

	List<Questionnaire> getAllQuestionnaires();

	Questionnaire addQuestionnaire(Questionnaire questionnaire);

	Questionnaire getQuestionnaireById(Long id);

	Questionnaire updateQuestionnaire(Long id, Questionnaire questionnaire);

	void deleteQuestionnaire(Long id);

	Questionnaire saveQuestionnaire(Questionnaire questionnaire);

	List<Question> getQuestionsByQuestionnaire(Long id);

	List<Questionnaire> getQuestionnairesWithUnansweredQuestions(Long userId);

}
