package com.itma.speciassist.service;

import java.util.List;

import com.itma.speciassist.model.ReponseUser;

public interface ReponseUserService {
    ReponseUser addReponse(ReponseUser reponse);
    List<ReponseUser> getAllReponses();
    ReponseUser getReponseById(Integer id);
    List<ReponseUser> getReponsesByUserId(Integer userId);
    List<ReponseUser> getReponsesByQuestionId(Integer questionId);
    ReponseUser updateReponse(Integer id, ReponseUser reponse);
    void deleteReponse(Integer id);
}
