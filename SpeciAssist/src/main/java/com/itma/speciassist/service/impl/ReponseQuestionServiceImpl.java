package com.itma.speciassist.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.itma.speciassist.model.ReponseQuestion;
import com.itma.speciassist.repository.ReponseQuestionRepository;
import com.itma.speciassist.service.ReponseQuestionService;

@Service
public class ReponseQuestionServiceImpl implements ReponseQuestionService {
    
    @Autowired
    private ReponseQuestionRepository reponseQuestionRepository;

    @Override
    public ReponseQuestion getReponseById(Integer id) {
        return reponseQuestionRepository.findById(id).orElse(null);
    }

    @Override
    public ReponseQuestion addReponse(ReponseQuestion reponse) {
        return reponseQuestionRepository.save(reponse);
    }

    @Override
    public ReponseQuestion updateReponse(Integer id, ReponseQuestion reponse) {
        if (reponseQuestionRepository.existsById(id)) {
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
