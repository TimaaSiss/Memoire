package com.itma.speciassist.service.impl;



import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itma.speciassist.model.Question;
import com.itma.speciassist.model.ReponseQuestion;
import com.itma.speciassist.repository.QuestionRepository;
import com.itma.speciassist.repository.ReponseQuestionRepository;
import com.itma.speciassist.service.ReponseQuestionService;

@Service
public class ReponseQuestionServiceImpl implements ReponseQuestionService {
    
    @Autowired
    private ReponseQuestionRepository reponseQuestionRepository;

    @Autowired
    private QuestionRepository questionRepository;

    @Override
    public ReponseQuestion getReponseById(Integer id) {
        return reponseQuestionRepository.findById(id).orElse(null);
    }

    @Override
    public ReponseQuestion addReponse(ReponseQuestion reponse) {
        // Assurez-vous que la question est sauvegardée en premier
        var question = reponse.getQuestion();
        
        // Créer une nouvelle instance de réponse avec une nouvelle référence de question
        ReponseQuestion nouvelleReponse = new ReponseQuestion();
        nouvelleReponse.setContenu(reponse.getContenu());
        nouvelleReponse.setQuestion(question);

        return reponseQuestionRepository.save(nouvelleReponse);
    }


    @Override
    public ReponseQuestion updateReponse(Integer id, ReponseQuestion reponse) {
        if (reponseQuestionRepository.existsById(id)) {
            // Assurez-vous que la question est sauvegardée en premier
            Question question = reponse.getQuestion();
            question = questionRepository.save(question);
            reponse.setQuestion(question);

            reponse.setId(id);
            return reponseQuestionRepository.save(reponse);
        }
        return null;
    }

    @Override
    public void deleteReponse(Integer id) {
        reponseQuestionRepository.deleteById(id);
    }
}
