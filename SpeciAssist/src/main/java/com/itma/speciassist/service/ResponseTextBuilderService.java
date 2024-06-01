package com.itma.speciassist.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.stereotype.Service;

import com.itma.speciassist.model.Question;
import com.itma.speciassist.model.Questionnaire;
import com.itma.speciassist.model.ReponseUser;

@Service
public class ResponseTextBuilderService {

	   public String buildResponseText(List<ReponseUser> reponsesUser) {
	        StringBuilder textBuilder = new StringBuilder();

	        // Grouper les réponses par questionnaire
	        Map<Questionnaire, List<ReponseUser>> groupedByQuestionnaire = reponsesUser.stream()
	            .collect(Collectors.groupingBy(reponseUser -> reponseUser.getQuestion().getQuestionnaire()));

	        // Construire le texte
	        groupedByQuestionnaire.forEach((questionnaire, responses) -> {
	            textBuilder.append("Questionnaire: ").append(questionnaire.getTitre()).append("\n\n");

	            for (ReponseUser reponseUser : responses) {
	                Question question = reponseUser.getQuestion();
	                if (question != null) {
	                    textBuilder.append("Question: ").append(question.getLibelle()).append("\n");
	                    textBuilder.append("Réponse: ").append(reponseUser.getReponseChoisie()).append("\n\n");
	                }
	            }
	        });

	        return textBuilder.toString();
	    }
}
