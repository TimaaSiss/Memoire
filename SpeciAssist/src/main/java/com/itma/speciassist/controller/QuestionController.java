package com.itma.speciassist.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.itma.speciassist.model.Question;
import com.itma.speciassist.model.Questionnaire;
import com.itma.speciassist.model.User;
import com.itma.speciassist.service.QuestionService;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    @Autowired
    private QuestionService questionService;

    @GetMapping("/allQuestions")
    public List<Question> getAllQuestions() {
        return questionService.getAllQuestions();
    }

    @PostMapping("/addQuestion")
    public Question addQuestion(@RequestBody Question question) {
        // Récupérer le questionnaire correspondant à l'ID spécifié
        Questionnaire questionnaire = question.getQuestionnaire();
        // Associer la question au questionnaire
        question.setQuestionnaire(questionnaire);
        
        User user = question.getUser(); // Récupérer l'utilisateur associé à la question
        // Associer l'utilisateur à la question 
        question.setUser(user);
        
        // Ajouter la question enregistrée
        Question addedQuestion = questionService.addQuestion(question);
        addedQuestion.getUser().setQuestions(null);
        // Assurez-vous que les informations sur le questionnaire sont incluses dans la réponse
        addedQuestion.getQuestionnaire().setQuestions(null); // Assurez-vous qu'il n'y a pas de boucle infinie
        return addedQuestion;
    }

    @GetMapping("/getQuestion/{id}")
    public Question getQuestionById(@PathVariable Long id) {
        return questionService.getQuestionById(id);
    }

    @PutMapping("/updateQuestion/{id}")
    public Question updateQuestion(@PathVariable Long id, @RequestBody Question question) {
        return questionService.updateQuestion(id, question);
    }

    @DeleteMapping("/deleteQuestion/{id}")
    public void deleteQuestion(@PathVariable Long id) {
        questionService.deleteQuestion(id);
    }
}
