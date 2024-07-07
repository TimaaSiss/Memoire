package com.itma.speciassist.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.itma.speciassist.model.ReponseUser;
import com.itma.speciassist.repository.ReponseUserRepository;
import com.itma.speciassist.service.ReponseUserService;

@Service
public class ReponseUserServiceImpl implements ReponseUserService {

    @Autowired
    private ReponseUserRepository reponseRepository;

    @Override
    public ReponseUser addReponse(ReponseUser reponse) {
        return reponseRepository.save(reponse);
    }

    @Override
    public List<ReponseUser> getAllReponses() {
        return reponseRepository.findAll();
    }

    @Override
    public ReponseUser getReponseById(Integer id) {
        return reponseRepository.findById(id).orElse(null);
    }

    @Override
    public List<ReponseUser> getReponsesByUserId(Integer userId) {
        return reponseRepository.findByUser_Id(userId, Sort.by(Sort.Direction.ASC, "question.questionnaire.id"));
    }

    @Override
    public List<ReponseUser> getReponsesByQuestionId(Integer questionId) {
        return reponseRepository.findByQuestion_Id(questionId);
    }

    @Override
    public ReponseUser updateReponse(Integer id, ReponseUser reponse) {
        if (!reponseRepository.existsById(id)) {
            return null;
        }
        reponse.setId(id);
        return reponseRepository.save(reponse);
    }

    @Override
    public void deleteReponse(Integer id) {
        reponseRepository.deleteById(id);
    }



	
}
