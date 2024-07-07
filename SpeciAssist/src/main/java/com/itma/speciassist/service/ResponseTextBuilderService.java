package com.itma.speciassist.service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itma.speciassist.model.Question;
import com.itma.speciassist.model.Questionnaire;
import com.itma.speciassist.model.ReponseOpenAI;
import com.itma.speciassist.model.ReponseUser;
import com.itma.speciassist.model.User;
import com.itma.speciassist.service.OpenAIService;

@Service
public class ResponseTextBuilderService {

    @Autowired
    private ReponseUserService reponseService;

    @Autowired
    private OpenAIService openAIService;

    public String buildResponseText(Integer userId) {
        StringBuilder textBuilder = new StringBuilder();

        textBuilder.append("Sur la base des réponses suivantes, suggère une carrière appropriée et bien evidemment en francais s'il te plait en ajoutant les styles html genre, tu mets les carrieres citées en liste pour l'affichage. N'oubie pas de me générer la reponse en francais :").append("\n\n");
            // get reponse user
        List<ReponseUser> reponses = reponseService.getReponsesByUserId(userId);

        // Grouper les réponses par questionnaire
        Map<Questionnaire, List<ReponseUser>> groupedByQuestionnaire = reponses.stream()
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
