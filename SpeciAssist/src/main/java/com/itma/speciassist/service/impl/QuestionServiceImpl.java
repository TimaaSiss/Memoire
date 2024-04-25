package com.itma.speciassist.service.impl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itma.speciassist.model.Question;
import com.itma.speciassist.model.Questionnaire;
import com.itma.speciassist.model.User;
import com.itma.speciassist.repository.QuestionRepository;
import com.itma.speciassist.service.QuestionService;
import com.itma.speciassist.service.QuestionnaireService;
import com.itma.speciassist.service.UserService;

@Service
public class QuestionServiceImpl implements QuestionService {

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }

    @Autowired // Assurez-vous que le service est injecté
    private QuestionnaireService questionnaireService;
    
    @Autowired
    private UserService userService; // Assurez-vous que ce bean est correctement configuré dans votre application


    @Override
    public Question addQuestion(Question question) {
        // Récupérer le questionnaire correspondant à l'ID spécifié
        Questionnaire questionnaire = questionnaireService.getQuestionnaireById(question.getQuestionnaire().getId());
        // Associer la question au questionnaire
        question.setQuestionnaire(questionnaire);
        
        // Récupérer l'utilisateur correspondant à l'ID spécifié
        User user = userService.getUserById(question.getUser().getId()); // Assurez-vous d'avoir un service UserService pour récupérer l'utilisateur
        // Associer l'utilisateur à la question
        question.setUser(user);
        
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
