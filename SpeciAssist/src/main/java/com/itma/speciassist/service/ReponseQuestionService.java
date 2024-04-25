package com.itma.speciassist.service;

import com.itma.speciassist.model.ReponseQuestion;

public interface ReponseQuestionService {
    ReponseQuestion getReponseById(Integer id);
    ReponseQuestion addReponse(ReponseQuestion reponse);
    ReponseQuestion updateReponse(Integer id, ReponseQuestion reponse);
    void deleteReponse(Integer id);
}
