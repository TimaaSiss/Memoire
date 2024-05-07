package com.itma.speciassist.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itma.speciassist.model.Question;
import com.itma.speciassist.model.Questionnaire;
import com.itma.speciassist.repository.QuestionRepository;
import com.itma.speciassist.service.QuestionService;
import com.itma.speciassist.service.QuestionnaireService;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired // Assurez-vous que le service est injecté
    private QuestionnaireService questionnaireService;

    @Override
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    @Override
    public Question addQuestion(Question question) {
        // Récupérer le questionnaire correspondant à l'ID spécifié
        Questionnaire questionnaire = questionnaireService.getQuestionnaireById(question.getQuestionnaire().getId());
        // Associer la question au questionnaire
        question.setQuestionnaire(questionnaire);

        // Ajouter la question enregistrée
        return questionRepository.save(question);
    }

    @Override
    public Question getQuestionById(Long id) {
        Optional<Question> optionalQuestion = questionRepository.findById(id);
        return optionalQuestion.orElse(null);
    }

    @Override
    public Question updateQuestion(Long id, Question question) {
        if (questionRepository.existsById(id)) {
            question.setId(id);
            return questionRepository.save(question);
        }
        return null;
    }

    @Override
    public void deleteQuestion(Long id) {
        questionRepository.deleteById(id);
    }

    @Override
    public Question saveQuestion(Question question) {
        return questionRepository.save(question);
    }
}
