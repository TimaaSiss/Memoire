package com.itma.speciassist.service;

import java.util.List;

import com.itma.speciassist.model.Question;

public interface QuestionService {

	List<Question> getAllQuestions();

	Question addQuestion(Question question);

	Question getQuestionById(Long id);

	Question updateQuestion(Long id, Question question);

	void deleteQuestion(Long id);

	Question saveQuestion(Question question);

}
